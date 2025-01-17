import type {ValueOf} from 'react-native-gesture-handler/lib/typescript/typeUtils';
import ReportListItem from '@components/SelectionList/Search/ReportListItem';
import TransactionListItem from '@components/SelectionList/Search/TransactionListItem';
import type {ReportListItemType, TransactionListItemType} from '@components/SelectionList/types';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type * as OnyxTypes from '@src/types/onyx';
import type {SearchAccountDetails, SearchDataTypes, SearchPersonalDetails, SearchTransaction, SearchTypeToItemMap, SectionsType} from '@src/types/onyx/SearchResults';
import DateUtils from "./DateUtils";
import getTopmostCentralPaneRoute from './Navigation/getTopmostCentralPaneRoute';
import navigationRef from './Navigation/navigationRef';
import type {CentralPaneNavigatorParamList, RootStackParamList, State} from './Navigation/types';
import * as TransactionUtils from './TransactionUtils';
import * as UserUtils from './UserUtils';

type SortOrder = ValueOf<typeof CONST.SORT_ORDER>;
type SearchColumnType = ValueOf<typeof CONST.SEARCH_TABLE_COLUMNS>;

const columnNamesToSortingProperty = {
    [CONST.SEARCH_TABLE_COLUMNS.TO]: 'formattedTo' as const,
    [CONST.SEARCH_TABLE_COLUMNS.FROM]: 'formattedFrom' as const,
    [CONST.SEARCH_TABLE_COLUMNS.DATE]: 'date' as const,
    [CONST.SEARCH_TABLE_COLUMNS.TAG]: 'tag' as const,
    [CONST.SEARCH_TABLE_COLUMNS.MERCHANT]: 'formattedMerchant' as const,
    [CONST.SEARCH_TABLE_COLUMNS.TOTAL_AMOUNT]: 'formattedTotal' as const,
    [CONST.SEARCH_TABLE_COLUMNS.CATEGORY]: 'category' as const,
    [CONST.SEARCH_TABLE_COLUMNS.TYPE]: 'type' as const,
    [CONST.SEARCH_TABLE_COLUMNS.ACTION]: 'action' as const,
    [CONST.SEARCH_TABLE_COLUMNS.DESCRIPTION]: null,
    [CONST.SEARCH_TABLE_COLUMNS.TAX_AMOUNT]: null,
    [CONST.SEARCH_TABLE_COLUMNS.RECEIPT]: null,
};

/**
 * @private
 */
function getTransactionItemCommonFormattedProperties(
    transactionItem: SearchTransaction,
    from: SearchPersonalDetails,
    to: SearchAccountDetails,
): Pick<TransactionListItemType, 'formattedFrom' | 'formattedTo' | 'formattedTotal' | 'formattedMerchant' | 'date'> {
    const isExpenseReport = transactionItem.reportType === CONST.REPORT.TYPE.EXPENSE;

    const formattedFrom = from?.displayName ?? from?.login ?? '';
    const formattedTo = to?.name ?? to?.displayName ?? to?.login ?? '';
    const formattedTotal = TransactionUtils.getAmount(transactionItem, isExpenseReport);
    const date = transactionItem?.modifiedCreated ? transactionItem.modifiedCreated : transactionItem?.created;
    const merchant = TransactionUtils.getMerchant(transactionItem);
    const formattedMerchant = merchant === CONST.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT || merchant === CONST.TRANSACTION.DEFAULT_MERCHANT ? '' : merchant;

    return {
        formattedFrom,
        formattedTo,
        date,
        formattedTotal,
        formattedMerchant,
    };
}

function isSearchDataType(type: string): type is SearchDataTypes {
    const searchDataTypes: string[] = Object.values(CONST.SEARCH_DATA_TYPES);
    return searchDataTypes.includes(type);
}

function getSearchType(search: OnyxTypes.SearchResults['search']): SearchDataTypes | undefined {
    if (!isSearchDataType(search.type)) {
        return undefined;
    }

    return search.type;
}

function getShouldShowMerchant(data: OnyxTypes.SearchResults['data']): boolean {
    return Object.values(data).some((item) => {
        const merchant = item.modifiedMerchant ? item.modifiedMerchant : item.merchant ?? '';
        return merchant !== CONST.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT && merchant !== CONST.TRANSACTION.DEFAULT_MERCHANT;
    });
}

function doesAtleastOneExpenseBelongToAPastYear(data: TransactionListItemType[] | ReportListItemType[] | OnyxTypes.SearchResults['data']): boolean {
    if (Array.isArray(data)) {
        return data.some((item: TransactionListItemType | ReportListItemType) => {
            if ('transactions' in item) {
                // If the item is a ReportListItemType, iterate over its transactions and check them
                return item.transactions.some(transaction => {
                    const transactionYear = new Date(transaction?.modifiedCreated ? transaction.modifiedCreated : transaction?.created || '').getFullYear();
                    return transactionYear !== new Date().getFullYear();
                });
            }

            const createdYear = new Date(item?.modifiedCreated ? item.modifiedCreated : item?.created || '').getFullYear();
            return createdYear !== new Date().getFullYear();
        });
    }
    for (const [key, transactionItem] of Object.entries(data)) {
        if (key.startsWith(ONYXKEYS.COLLECTION.TRANSACTION)) {
            const item = transactionItem as SearchTransaction;
            const date = item?.modifiedCreated ? item.modifiedCreated : item?.created || '';

            if (DateUtils.doesDateBelongToAPastYear(date)) {
                return true;
            }
        }
    }
    return false;
}

function getTransactionsSections(data: OnyxTypes.SearchResults['data']): TransactionListItemType[] {
    const shouldShowMerchant = getShouldShowMerchant(data);

    const doesDataContainAPastYearTransaction = doesAtleastOneExpenseBelongToAPastYear(data);

    return Object.entries(data)
        .filter(([key]) => key.startsWith(ONYXKEYS.COLLECTION.TRANSACTION))
        .map(([, transactionItem]) => {
            const isExpenseReport = transactionItem.reportType === CONST.REPORT.TYPE.EXPENSE;
            const from = data.personalDetailsList?.[transactionItem.accountID];
            const to = isExpenseReport
                ? (data[`${ONYXKEYS.COLLECTION.POLICY}${transactionItem.policyID}`] as SearchAccountDetails)
                : (data.personalDetailsList?.[transactionItem.managerID] as SearchAccountDetails);

            const {formattedFrom, formattedTo, formattedTotal, formattedMerchant, date} = getTransactionItemCommonFormattedProperties(transactionItem, from, to);

            return {
                ...transactionItem,
                from,
                to,
                formattedFrom,
                formattedTo,
                formattedTotal,
                formattedMerchant,
                date,
                shouldShowMerchant,
                shouldShowCategory: true,
                shouldShowTag: true,
                shouldShowTax: true,
                keyForList: transactionItem.transactionID,
                doesAtleastOneExpenseBelongToAPastYear: doesDataContainAPastYearTransaction,
            };
        });
}

function getReportSections(data: OnyxTypes.SearchResults['data']): ReportListItemType[] {
    const shouldShowMerchant = getShouldShowMerchant(data);

    const doesDataContainAPastYearTransaction = doesAtleastOneExpenseBelongToAPastYear(data);

    const reportIDToTransactions: Record<string, ReportListItemType> = {};
    for (const key in data) {
        if (key.startsWith(ONYXKEYS.COLLECTION.REPORT)) {
            const value = {...data[key]};
            const reportKey = `${ONYXKEYS.COLLECTION.REPORT}${value.reportID}`;
            reportIDToTransactions[reportKey] = {
                ...value,
                transactions: reportIDToTransactions[reportKey]?.transactions ?? [],
            };
        } else if (key.startsWith(ONYXKEYS.COLLECTION.TRANSACTION)) {
            const transactionItem = {...data[key]};
            const isExpenseReport = transactionItem.reportType === CONST.REPORT.TYPE.EXPENSE;
            const reportKey = `${ONYXKEYS.COLLECTION.REPORT}${transactionItem.reportID}`;

            const from = data.personalDetailsList?.[transactionItem.accountID];
            const to = isExpenseReport
                ? (data[`${ONYXKEYS.COLLECTION.POLICY}${transactionItem.policyID}`] as SearchAccountDetails)
                : (data.personalDetailsList?.[transactionItem.managerID] as SearchAccountDetails);

            const {formattedFrom, formattedTo, formattedTotal, formattedMerchant, date} = getTransactionItemCommonFormattedProperties(transactionItem, from, to);

            const transaction = {
                ...transactionItem,
                from,
                to,
                formattedFrom,
                formattedTo,
                formattedTotal,
                formattedMerchant,
                date,
                shouldShowMerchant,
                shouldShowCategory: true,
                shouldShowTag: true,
                shouldShowTax: true,
                keyForList: transactionItem.transactionID,
                doesAtleastOneExpenseBelongToAPastYear: doesDataContainAPastYearTransaction,
            };
            if (reportIDToTransactions[reportKey]?.transactions) {
                reportIDToTransactions[reportKey].transactions.push(transaction);
            } else {
                reportIDToTransactions[reportKey] = {transactions: [transaction]};
            }
        }
    }

    return Object.values(reportIDToTransactions);
}

const searchTypeToItemMap: SearchTypeToItemMap = {
    [CONST.SEARCH_DATA_TYPES.TRANSACTION]: {
        listItem: TransactionListItem,
        getSections: getTransactionsSections,
        getSortedSections: getSortedTransactionData,
    },
    [CONST.SEARCH_DATA_TYPES.REPORT]: {
        listItem: ReportListItem,
        getSections: getReportSections,
        // sorting for ReportItems not yet implemented
        getSortedSections: (data) => data,
    },
};

function getListItem<K extends keyof SearchTypeToItemMap>(type: K): SearchTypeToItemMap[K]['listItem'] {
    return searchTypeToItemMap[type].listItem;
}

function getSections<K extends keyof SearchTypeToItemMap>(data: OnyxTypes.SearchResults['data'], type: K): ReturnType<SearchTypeToItemMap[K]['getSections']> {
    return searchTypeToItemMap[type].getSections(data) as ReturnType<SearchTypeToItemMap[K]['getSections']>;
}

function getSortedSections<K extends keyof SearchTypeToItemMap>(
    type: K,
    data: SectionsType<K>,
    sortBy?: SearchColumnType,
    sortOrder?: SortOrder,
): ReturnType<SearchTypeToItemMap[K]['getSortedSections']> {
    return searchTypeToItemMap[type].getSortedSections(data, sortBy, sortOrder) as ReturnType<SearchTypeToItemMap[K]['getSortedSections']>;
}

function getQueryHash(query: string, policyID?: string, sortBy?: string, sortOrder?: string): number {
    const textToHash = [query, policyID, sortOrder, sortBy].filter(Boolean).join('_');
    return UserUtils.hashText(textToHash, 2 ** 32);
}

function getSortedTransactionData(data: TransactionListItemType[], sortBy?: SearchColumnType, sortOrder?: SortOrder) {
    if (!sortBy || !sortOrder) {
        return data;
    }

    const sortingProperty = columnNamesToSortingProperty[sortBy];

    if (!sortingProperty) {
        return data;
    }

    return data.sort((a, b) => {
        const aValue = a[sortingProperty];
        const bValue = b[sortingProperty];

        if (aValue === undefined || bValue === undefined) {
            return 0;
        }

        // We are guaranteed that both a and b will be string or number at the same time
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === CONST.SORT_ORDER.ASC ? aValue.toLowerCase().localeCompare(bValue) : bValue.toLowerCase().localeCompare(aValue);
        }

        const aNum = aValue as number;
        const bNum = bValue as number;

        return sortOrder === CONST.SORT_ORDER.ASC ? aNum - bNum : bNum - aNum;
    });
}

function getSearchParams() {
    const topmostCentralPaneRoute = getTopmostCentralPaneRoute(navigationRef.getRootState() as State<RootStackParamList>);
    return topmostCentralPaneRoute?.params as CentralPaneNavigatorParamList['Search_Central_Pane'];
}

export {getListItem, getQueryHash, getSections, getSortedSections, getShouldShowMerchant, getSearchType, getSearchParams, doesAtleastOneExpenseBelongToAPastYear};
export type {SearchColumnType, SortOrder};
