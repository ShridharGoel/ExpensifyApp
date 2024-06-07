// TODO: Is this a legit use case for exposing `OnyxCache`, or should we use `Onyx.connect`?
import fastMerge from 'expensify-common/dist/fastMerge';
import Onyx from 'react-native-onyx';
import OnyxCache from 'react-native-onyx/dist/OnyxCache';
import Log from '@libs/Log';
import PaginationUtils from '@libs/PaginationUtils';
import CONST from '@src/CONST';
import type {OnyxCollectionKey, OnyxPagesKey, OnyxValues} from '@src/ONYXKEYS';
import type {Pages, Request} from '@src/types/onyx';
import type {PaginatedRequest} from '@src/types/onyx/Request';
import type Middleware from './types';

function isPaginatedRequest<TResourceKey extends OnyxCollectionKey, TPageKey extends OnyxPagesKey>(
    request: Request | PaginatedRequest<TResourceKey, TPageKey>,
): request is PaginatedRequest<TResourceKey, TPageKey> {
    return 'isPaginated' in request && request.isPaginated;
}

/**
 * This middleware handles paginated requests marked with isPaginated: true. It works by:
 *
 * 1. Extracting the paginated resources from the response
 * 2. Sorting them
 * 3. Merging the new page of resources with any preexisting pages it overlaps with
 * 4. Updating the saves pages in Onyx for that resource.
 *
 * It does this to keep track of what it's fetched via pagination and what may have showed up from other sources,
 * so it can keep track of and fill any potential gaps in paginated lists.
 */
const Pagination: Middleware = (requestResponse, request) => {
    if (!isPaginatedRequest(request)) {
        return requestResponse;
    }

    const {resourceCollectionKey, resourceID, pageCollectionKey, sortItems, getItemID, requestType} = request;
    return requestResponse.then((response) => {
        if (!response?.onyxData) {
            return Promise.resolve(response);
        }

        const resourceKey = `${resourceCollectionKey}${resourceID}` as const;
        const pageKey = `${pageCollectionKey}${resourceID}` as const;

        // Create a new page based on the response
        const pageItems = (response.onyxData.find((data) => data.key === resourceKey)?.value ?? {}) as OnyxValues[typeof resourceCollectionKey];
        const sortedPageItems = sortItems(pageItems);
        if (sortedPageItems.length === 0) {
            // Must have at least 1 action to create a page.
            Log.hmmm(`[Pagination] Did not receive any items in the response to ${request.command}`);
            return Promise.resolve(response);
        }

        const newPage = sortedPageItems.map((item) => getItemID(item));

        // Detect if we are at the start of the list. This will always be the case for the initial request.
        // For previous requests we check that no new data is returned. Ideally the server would return that info.
        if (requestType === 'initial' || (requestType === 'next' && newPage.length === 1)) {
            newPage.unshift(CONST.PAGINATION_START_ID);
        }

        const existingItems = (OnyxCache.getValue(resourceKey) ?? {}) as OnyxValues[typeof resourceCollectionKey];
        const allItems = fastMerge(existingItems, pageItems, true);
        const sortedAllItems = sortItems(allItems);

        const existingPages = (OnyxCache.getValue(pageKey) ?? []) as Pages;
        const mergedPages = PaginationUtils.mergeContinuousPages(sortedAllItems, [...existingPages, newPage], getItemID);

        response.onyxData.push({
            key: pageKey,
            onyxMethod: Onyx.METHOD.SET,
            value: mergedPages,
        });

        return Promise.resolve(response);
    });
};

export default Pagination;
