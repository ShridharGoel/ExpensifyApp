import type {ContentStyle} from '@shopify/flash-list';
import type {RefObject} from 'react';
import {type StyleProp, View, type ViewStyle} from 'react-native';
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import type {CurrentReportIDContextValue} from '@components/withCurrentReportID';
import CONST from '@src/CONST';
import type {OptionData} from '@src/libs/ReportUtils';
import type {PersonalDetails, Policy, Report, ReportAction, ReportActions, Transaction} from '@src/types/onyx';

type LHNOptionsListOnyxProps = {
    /** The policy which the user has access to and which the report could be tied to */
    policy: OnyxCollection<Policy>;

    /** All reports shared with the user */
    reports: OnyxCollection<Report>;

    /** Array of report actions for this report */
    reportActions: OnyxCollection<ReportActions>;

    /** Indicates which locale the user currently has selected */
    preferredLocale: OnyxEntry<ValueOf<typeof CONST.LOCALES>>;

    /** List of users' personal details */
    personalDetails: OnyxEntry<Record<string, PersonalDetails>>;

    /** The transaction from the parent report action */
    transactions: OnyxCollection<Transaction>;

    /** List of draft comments */
    draftComments: OnyxCollection<string>;
};
type CustomLHNOptionsListProps = {
    /** Wrapper style for the section list */
    style?: StyleProp<ViewStyle>;

    /** Extra styles for the section list container */
    contentContainerStyles?: ContentStyle;

    /** Sections for the section list */
    data: string[];

    /** Callback to fire when a row is selected */
    onSelectRow: (reportID: string) => void;

    /** Toggle between compact and default view of the option */
    optionMode: ValueOf<typeof CONST.OPTION_MODE>;

    /** Whether to allow option focus or not */
    shouldDisableFocusOptions?: boolean;
};

type LHNOptionsListProps = CustomLHNOptionsListProps & CurrentReportIDContextValue & LHNOptionsListOnyxProps;

type OptionRowLHNDataProps = {
    /** Whether row should be focused */
    isFocused: boolean;

    /** List of users' personal details */
    personalDetails: Record<string, PersonalDetails>;

    /** The preferred language for the app */
    preferredLocale: OnyxEntry<ValueOf<typeof CONST.LOCALES>>;

    /** The full data of the report */
    fullReport: OnyxEntry<Report>;

    /** The policy which the user has access to and which the report could be tied to */
    policy: OnyxEntry<Policy>;

    /** The action from the parent report */
    parentReportAction: OnyxEntry<ReportAction>;

    /** The transaction from the parent report action */
    transaction: OnyxEntry<Transaction>;

    comment: string;

    receiptTransactions: OnyxCollection<Transaction>;

    reportID: string;

    reportActions: OnyxEntry<ReportActions>;
};

type OptionRowLHNProps = {
    reportID: string;
    isFocused?: boolean;
    onSelectRow?: (optionItem: OptionData, popoverAnchor: RefObject<View>) => void;
    viewMode?: ValueOf<typeof CONST.OPTION_MODE>;
    style?: ViewStyle | ViewStyle[];
    optionItem?: OptionData | null;
};

type RenderItemProps = {item: string};

export type {LHNOptionsListProps, OptionRowLHNDataProps, OptionRowLHNProps, LHNOptionsListOnyxProps, RenderItemProps};
