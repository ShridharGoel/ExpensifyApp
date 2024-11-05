import type {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useOnyx} from 'react-native-onyx';
import AttachmentModal from '@components/AttachmentModal';
import type {Attachment} from '@components/Attachments/types';
import ComposerFocusManager from '@libs/ComposerFocusManager';
import Navigation from '@libs/Navigation/Navigation';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';

type ReportAttachmentsProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.ATTACHMENTS>;

function ReportAttachments({route}: ReportAttachmentsProps) {
    const reportID = route.params.reportID;
    const type = route.params.type;
    const accountID = route.params.accountID;
    const isAuthTokenRequired = route.params.isAuthTokenRequired;
    const imageHrefLink = route.params.imageHrefLink;
    const [report] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${reportID || -1}`);
    const [isLoadingApp] = useOnyx(ONYXKEYS.IS_LOADING_APP);

    // In native the imported images sources are of type number. Ref: https://reactnative.dev/docs/image#imagesource
    const source = Number(route.params.source) || route.params.source;

    const onCarouselAttachmentChange = useCallback(
        (attachment: Attachment) => {
            const routeToNavigate = ROUTES.ATTACHMENTS.getRoute(reportID, type, String(attachment.source), Number(accountID), !!isAuthTokenRequired, imageHrefLink);
            Navigation.navigate(routeToNavigate);
        },
        [reportID, type, accountID, isAuthTokenRequired, imageHrefLink],
    );

    return (
        <AttachmentModal
            accountID={Number(accountID)}
            type={type}
            allowDownload
            defaultOpen
            report={report}
            source={source}
            onModalClose={() => {
                Navigation.dismissModal();
                // This enables Composer refocus when the attachments modal is closed by the browser navigation
                ComposerFocusManager.setReadyToFocus();
            }}
            onCarouselAttachmentChange={onCarouselAttachmentChange}
            shouldShowNotFoundPage={!isLoadingApp && type !== CONST.ATTACHMENT_TYPE.SEARCH && !report?.reportID}
            isAuthTokenRequired={!!isAuthTokenRequired}
            imageHrefLink={imageHrefLink ?? ''}
        />
    );
}

ReportAttachments.displayName = 'ReportAttachments';

export default ReportAttachments;
