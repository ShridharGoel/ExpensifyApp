import React from 'react';
import {ScrollView, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import Button from '@components/Button';
import DotIndicatorMessage from '@components/DotIndicatorMessage';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ErrorUtils from '@libs/ErrorUtils';
import BankAccount from '@libs/models/BankAccount';
import getSubstepValues from '@pages/ReimbursementAccount/utils/getSubstepValues';
import getValuesForBeneficialOwner from '@pages/ReimbursementAccount/utils/getValuesForBeneficialOwner';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {ReimbursementAccount, ReimbursementAccountForm} from '@src/types/onyx';

const reimbursementAccountDefault = {
    achData: {
        state: BankAccount.STATE.SETUP,
    },
    isLoading: false,
    errorFields: {},
    errors: {},
    maxAttemptsReached: false,
    shouldShowResetModal: false,
};

type CompanyOwnersListUBOIOnyxProps = {
    /** Reimbursement account from ONYX */
    reimbursementAccount: OnyxEntry<ReimbursementAccount>;

    /** The draft values of the bank account being setup */
    reimbursementAccountDraft: OnyxEntry<ReimbursementAccountForm>;
};

type CompanyOwnersListUBOProps = CompanyOwnersListUBOIOnyxProps & {
    /** Method called when user confirms data */
    handleUBOsConfirmation: () => void;

    /** Method called when user presses on one of UBOs to edit its data */
    handleUBOEdit: (value: string) => void;

    /** List of UBO keys */
    beneficialOwnerKeys: string[];

    /** Info is user UBO */
    isUserUBO: boolean;

    /** Info about other existing UBOs */
    isAnyoneElseUBO: boolean;
};

const REQUESTOR_PERSONAL_INFO_KEYS = CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY;

function CompanyOwnersListUBO({
    reimbursementAccount = reimbursementAccountDefault,
    reimbursementAccountDraft,
    isAnyoneElseUBO,
    isUserUBO,
    handleUBOsConfirmation,
    beneficialOwnerKeys,
    handleUBOEdit,
}: CompanyOwnersListUBOProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const isLoading = reimbursementAccount?.isLoading ?? false;
    const requestorData = getSubstepValues(REQUESTOR_PERSONAL_INFO_KEYS, {}, reimbursementAccount);
    const error = ErrorUtils.getLatestErrorMessage(reimbursementAccount);

    const extraBeneficialOwners =
        isAnyoneElseUBO &&
        reimbursementAccountDraft &&
        beneficialOwnerKeys.map((ownerKey) => {
            const beneficialOwnerData = getValuesForBeneficialOwner(ownerKey, reimbursementAccountDraft);

            return (
                <MenuItem
                    key={ownerKey}
                    title={`${beneficialOwnerData.firstName} ${beneficialOwnerData.lastName}`}
                    description={`${beneficialOwnerData.street}, ${beneficialOwnerData.city}, ${beneficialOwnerData.state} ${beneficialOwnerData.zipCode}`}
                    wrapperStyle={[styles.ph5]}
                    icon={Expensicons.FallbackAvatar}
                    onPress={() => {
                        handleUBOEdit(ownerKey);
                    }}
                    iconWidth={40}
                    iconHeight={40}
                    interactive
                    shouldShowRightIcon
                />
            );
        });

    return (
        <ScreenWrapper
            testID={CompanyOwnersListUBO.displayName}
            style={[styles.pt0]}
        >
            <ScrollView contentContainerStyle={[styles.flexGrow1, styles.ph0]}>
                <Text style={[styles.textHeadlineLineHeightXXL, styles.ph5, styles.mt5]}>{translate('beneficialOwnerInfoStep.letsDoubleCheck')}</Text>
                <Text style={[styles.p5, styles.textSupporting]}>{translate('beneficialOwnerInfoStep.regulationRequiresUsToVerifyTheIdentity')}</Text>
                <View>
                    <Text style={[styles.textSupporting, styles.pv1, styles.ph5]}>{`${translate('beneficialOwnerInfoStep.owners')}:`}</Text>
                    {isUserUBO && (
                        <MenuItem
                            title={`${requestorData.firstName} ${requestorData.lastName}`}
                            description={`${requestorData.requestorAddressStreet}, ${requestorData.requestorAddressCity}, ${requestorData.requestorAddressState} ${requestorData.requestorAddressZipCode}`}
                            wrapperStyle={[styles.ph5]}
                            icon={Expensicons.FallbackAvatar}
                            iconWidth={40}
                            iconHeight={40}
                            interactive={false}
                            shouldShowRightIcon={false}
                        />
                    )}
                    {extraBeneficialOwners}
                </View>

                <View style={[styles.ph5, styles.mtAuto]}>
                    {error.length > 0 && (
                        <DotIndicatorMessage
                            textStyles={[styles.formError]}
                            type="error"
                            messages={{error}}
                        />
                    )}
                </View>
                <Button
                    success
                    isLoading={isLoading}
                    style={[styles.w100, styles.mt2, styles.pb5, styles.ph5]}
                    onPress={handleUBOsConfirmation}
                    text={translate('common.confirm')}
                />
            </ScrollView>
        </ScreenWrapper>
    );
}

CompanyOwnersListUBO.displayName = 'CompanyOwnersListUBO';

export default withOnyx<CompanyOwnersListUBOProps, CompanyOwnersListUBOIOnyxProps>({
    reimbursementAccount: {
        key: ONYXKEYS.REIMBURSEMENT_ACCOUNT,
    },
    reimbursementAccountDraft: {
        key: ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM_DRAFT,
    },
})(CompanyOwnersListUBO);
