import * as IOUUtils from "@libs/IOUUtils";
import {isEmptyObject} from "@src/types/utils/EmptyObject";
import * as ReportUtils from "@libs/ReportUtils";
import CONST from "@src/CONST";
import * as PolicyUtils from "@libs/PolicyUtils";

const canNotAccessRequestPage = (report, policy, iouType, allPolicies) => {
    return !IOUUtils.isValidMoneyRequestType(iouType) || !((isEmptyObject(report?.reportID) || ReportUtils.canCreateRequest(report, policy, iouType)) && (iouType === CONST.IOU.TYPE.INVOICE ? PolicyUtils.canSendInvoice(allPolicies) : true));
}

export default canNotAccessRequestPage;
