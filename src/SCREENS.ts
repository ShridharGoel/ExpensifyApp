/**
 * This is a file containing constants for all of the screen names. In most cases, we should use the routes for
 * navigation. But there are situations where we may need to access screen names directly.
 */
import type DeepValueOf from './types/utils/DeepValueOf';

const PROTECTED_SCREENS = {
    HOME: 'Home',
    CONCIERGE: 'Concierge',
    ATTACHMENTS: 'Attachments',
    TRACK_EXPENSE: 'TrackExpense',
    SUBMIT_EXPENSE: 'SubmitExpense',
} as const;

const SCREENS = {
    ...PROTECTED_SCREENS,
    REPORT: 'Report',
    PROFILE_AVATAR: 'ProfileAvatar',
    WORKSPACE_AVATAR: 'WorkspaceAvatar',
    REPORT_AVATAR: 'ReportAvatar',
    NOT_FOUND: 'not-found',
    TRANSITION_BETWEEN_APPS: 'TransitionBetweenApps',
    VALIDATE_LOGIN: 'ValidateLogin',
    CONNECTION_COMPLETE: 'ConnectionComplete',
    UNLINK_LOGIN: 'UnlinkLogin',
    SETTINGS_CENTRAL_PANE: 'SettingsCentralPane',
    TRAVEL: {
        MY_TRIPS: 'Travel_MyTrips',
        TCS: 'Travel_TCS',
    },
    SEARCH: {
        CENTRAL_PANE: 'Search_Central_Pane',
        REPORT_RHP: 'Search_Report_RHP',
        ADVANCED_FILTERS_RHP: 'Search_Advanced_Filters_RHP',
        ADVANCED_FILTERS_DATE_RHP: 'Search_Advanced_Filters_Date_RHP',
        ADVANCED_FILTERS_CURRENCY_RHP: 'Search_Advanced_Filters_Currency_RHP',
        ADVANCED_FILTERS_DESCRIPTION_RHP: 'Search_Advanced_Filters_Description_RHP',
        ADVANCED_FILTERS_MERCHANT_RHP: 'Search_Advanced_Filters_Merchant_RHP',
        ADVANCED_FILTERS_REPORT_ID_RHP: 'Search_Advanced_Filters_ReportID_RHP',
        ADVANCED_FILTERS_AMOUNT_RHP: 'Search_Advanced_Filters_Amount_RHP',
        ADVANCED_FILTERS_CATEGORY_RHP: 'Search_Advanced_Filters_Category_RHP',
        ADVANCED_FILTERS_KEYWORD_RHP: 'Search_Advanced_Filters_Keyword_RHP',
        ADVANCED_FILTERS_CARD_RHP: 'Search_Advanced_Filters_Card_RHP',
        ADVANCED_FILTERS_TAX_RATE_RHP: 'Search_Advanced_Filters_Tax_Rate_RHP',
        ADVANCED_FILTERS_EXPENSE_TYPE_RHP: 'Search_Advanced_Filters_Expense_Type_RHP',
        ADVANCED_FILTERS_TAG_RHP: 'Search_Advanced_Filters_Tag_RHP',
        ADVANCED_FILTERS_FROM_RHP: 'Search_Advanced_Filters_From_RHP',
        ADVANCED_FILTERS_TO_RHP: 'Search_Advanced_Filters_To_RHP',
        SAVED_SEARCH_RENAME_RHP: 'Search_Saved_Search_Rename_RHP',
        ADVANCED_FILTERS_IN_RHP: 'Search_Advanced_Filters_In_RHP',
        TRANSACTION_HOLD_REASON_RHP: 'Search_Transaction_Hold_Reason_RHP',
        BOTTOM_TAB: 'Search_Bottom_Tab',
    },
    SETTINGS: {
        ROOT: 'Settings_Root',
        SHARE_CODE: 'Settings_Share_Code',
        WORKSPACES: 'Settings_Workspaces',
        SECURITY: 'Settings_Security',
        ABOUT: 'Settings_About',
        SAVE_THE_WORLD: 'Settings_TeachersUnite',
        APP_DOWNLOAD_LINKS: 'Settings_App_Download_Links',
        ADD_DEBIT_CARD: 'Settings_Add_Debit_Card',
        ADD_PAYMENT_CARD_CHANGE_CURRENCY: 'Settings_Add_Payment_Card_Change_Currency',
        ADD_BANK_ACCOUNT: 'Settings_Add_Bank_Account',
        CLOSE: 'Settings_Close',
        TWO_FACTOR_AUTH: 'Settings_TwoFactorAuth',
        REPORT_CARD_LOST_OR_DAMAGED: 'Settings_ReportCardLostOrDamaged',
        TROUBLESHOOT: 'Settings_Troubleshoot',
        CONSOLE: 'Settings_Console',
        SHARE_LOG: 'Share_Log',

        PROFILE: {
            ROOT: 'Settings_Profile',
            DISPLAY_NAME: 'Settings_Display_Name',
            CONTACT_METHODS: 'Settings_ContactMethods',
            CONTACT_METHOD_DETAILS: 'Settings_ContactMethodDetails',
            CONTACT_METHOD_VALIDATE_ACTION: 'Settings_ValidateContactMethodAction',
            NEW_CONTACT_METHOD: 'Settings_NewContactMethod',
            STATUS_CLEAR_AFTER: 'Settings_Status_Clear_After',
            STATUS_CLEAR_AFTER_DATE: 'Settings_Status_Clear_After_Date',
            STATUS_CLEAR_AFTER_TIME: 'Settings_Status_Clear_After_Time',
            STATUS: 'Settings_Status',
            PRONOUNS: 'Settings_Pronouns',
            TIMEZONE: 'Settings_Timezone',
            TIMEZONE_SELECT: 'Settings_Timezone_Select',
            LEGAL_NAME: 'Settings_LegalName',
            DATE_OF_BIRTH: 'Settings_DateOfBirth',
            ADDRESS: 'Settings_Address',
            ADDRESS_COUNTRY: 'Settings_Address_Country',
            ADDRESS_STATE: 'Settings_Address_State',
        },

        PREFERENCES: {
            ROOT: 'Settings_Preferences',
            PRIORITY_MODE: 'Settings_Preferences_PriorityMode',
            LANGUAGE: 'Settings_Preferences_Language',
            THEME: 'Settings_Preferences_Theme',
        },

        WALLET: {
            ROOT: 'Settings_Wallet',
            DOMAIN_CARD: 'Settings_Wallet_DomainCard',
            CARD_GET_PHYSICAL: {
                NAME: 'Settings_Card_Get_Physical_Name',
                PHONE: 'Settings_Card_Get_Physical_Phone',
                ADDRESS: 'Settings_Card_Get_Physical_Address',
                CONFIRM: 'Settings_Card_Get_Physical_Confirm',
            },
            TRANSFER_BALANCE: 'Settings_Wallet_Transfer_Balance',
            CHOOSE_TRANSFER_ACCOUNT: 'Settings_Wallet_Choose_Transfer_Account',
            ENABLE_PAYMENTS: 'Settings_Wallet_EnablePayments',
            CARD_ACTIVATE: 'Settings_Wallet_Card_Activate',
            REPORT_VIRTUAL_CARD_FRAUD: 'Settings_Wallet_ReportVirtualCardFraud',
            CARDS_DIGITAL_DETAILS_UPDATE_ADDRESS: 'Settings_Wallet_Cards_Digital_Details_Update_Address',
        },

        EXIT_SURVEY: {
            REASON: 'Settings_ExitSurvey_Reason',
            RESPONSE: 'Settings_ExitSurvey_Response',
            CONFIRM: 'Settings_ExitSurvey_Confirm',
        },

        SUBSCRIPTION: {
            ROOT: 'Settings_Subscription',
            SIZE: 'Settings_Subscription_Size',
            ADD_PAYMENT_CARD: 'Settings_Subscription_Add_Payment_Card',
            DISABLE_AUTO_RENEW_SURVEY: 'Settings_Subscription_DisableAutoRenewSurvey',
            CHANGE_BILLING_CURRENCY: 'Settings_Subscription_Change_Billing_Currency',
            CHANGE_PAYMENT_CURRENCY: 'Settings_Subscription_Change_Payment_Currency',
            REQUEST_EARLY_CANCELLATION: 'Settings_Subscription_RequestEarlyCancellation',
        },
        DELEGATE: {
            ADD_DELEGATE: 'Settings_Delegate_Add',
            DELEGATE_ROLE: 'Settings_Delegate_Role',
            DELEGATE_CONFIRM: 'Settings_Delegate_Confirm',
            DELEGATE_MAGIC_CODE: 'Settings_Delegate_Magic_Code',
        },
    },
    SAVE_THE_WORLD: {
        ROOT: 'SaveTheWorld_Root',
    },
    LEFT_MODAL: {
        CHAT_FINDER: 'ChatFinder',
        WORKSPACE_SWITCHER: 'WorkspaceSwitcher',
    },
    RIGHT_MODAL: {
        SETTINGS: 'Settings',
        NEW_CHAT: 'NewChat',
        DETAILS: 'Details',
        PROFILE: 'Profile',
        REPORT_DETAILS: 'Report_Details',
        REPORT_SETTINGS: 'Report_Settings',
        REPORT_DESCRIPTION: 'Report_Description',
        PARTICIPANTS: 'Participants',
        MONEY_REQUEST: 'MoneyRequest',
        NEW_TASK: 'NewTask',
        TEACHERS_UNITE: 'TeachersUnite',
        TASK_DETAILS: 'Task_Details',
        ENABLE_PAYMENTS: 'EnablePayments',
        SPLIT_DETAILS: 'SplitDetails',
        ADD_PERSONAL_BANK_ACCOUNT: 'AddPersonalBankAccount',
        WALLET_STATEMENT: 'Wallet_Statement',
        FLAG_COMMENT: 'Flag_Comment',
        EDIT_REQUEST: 'EditRequest',
        SIGN_IN: 'SignIn',
        PRIVATE_NOTES: 'Private_Notes',
        ROOM_MEMBERS: 'RoomMembers',
        ROOM_MEMBER_DETAILS: 'RoomMembers_Details',
        ROOM_INVITE: 'RoomInvite',
        REFERRAL: 'Referral',
        PROCESS_MONEY_REQUEST_HOLD: 'ProcessMoneyRequestHold',
        TRANSACTION_DUPLICATE: 'TransactionDuplicate',
        TRAVEL: 'Travel',
        SEARCH_REPORT: 'SearchReport',
        SEARCH_ADVANCED_FILTERS: 'SearchAdvancedFilters',
        SEARCH_SAVED_SEARCH: 'SearchSavedSearch',
        SETTINGS_CATEGORIES: 'SettingsCategories',
        RESTRICTED_ACTION: 'RestrictedAction',
        REPORT_EXPORT: 'Report_Export',
        MISSING_PERSONAL_DETAILS: 'MissingPersonalDetails',
    },
    ONBOARDING_MODAL: {
        ONBOARDING: 'Onboarding',
    },
    SIGN_IN_WITH_APPLE_DESKTOP: 'AppleSignInDesktop',
    SIGN_IN_WITH_GOOGLE_DESKTOP: 'GoogleSignInDesktop',
    DESKTOP_SIGN_IN_REDIRECT: 'DesktopSignInRedirect',
    SAML_SIGN_IN: 'SAMLSignIn',
    WORKSPACE_JOIN_USER: 'WorkspaceJoinUser',

    MONEY_REQUEST: {
        CREATE: 'Money_Request_Create',
        HOLD: 'Money_Request_Hold_Reason',
        STEP_CONFIRMATION: 'Money_Request_Step_Confirmation',
        START: 'Money_Request_Start',
        STEP_AMOUNT: 'Money_Request_Step_Amount',
        STEP_CATEGORY: 'Money_Request_Step_Category',
        STEP_CURRENCY: 'Money_Request_Step_Currency',
        STEP_DATE: 'Money_Request_Step_Date',
        STEP_DESCRIPTION: 'Money_Request_Step_Description',
        STEP_DISTANCE: 'Money_Request_Step_Distance',
        STEP_DISTANCE_RATE: 'Money_Request_Step_Rate',
        STEP_MERCHANT: 'Money_Request_Step_Merchant',
        STEP_PARTICIPANTS: 'Money_Request_Step_Participants',
        STEP_SCAN: 'Money_Request_Step_Scan',
        STEP_TAG: 'Money_Request_Step_Tag',
        STEP_WAYPOINT: 'Money_Request_Step_Waypoint',
        STEP_TAX_AMOUNT: 'Money_Request_Step_Tax_Amount',
        STEP_TAX_RATE: 'Money_Request_Step_Tax_Rate',
        STEP_SPLIT_PAYER: 'Money_Request_Step_Split_Payer',
        STEP_SEND_FROM: 'Money_Request_Step_Send_From',
        STEP_COMPANY_INFO: 'Money_Request_Step_Company_Info',
        CURRENCY: 'Money_Request_Currency',
        WAYPOINT: 'Money_Request_Waypoint',
        EDIT_WAYPOINT: 'Money_Request_Edit_Waypoint',
        RECEIPT: 'Money_Request_Receipt',
        STATE_SELECTOR: 'Money_Request_State_Selector',
    },

    TRANSACTION_DUPLICATE: {
        REVIEW: 'Transaction_Duplicate_Review',
        MERCHANT: 'Transaction_Duplicate_Merchant',
        CATEGORY: 'Transaction_Duplicate_Category',
        TAG: 'Transaction_Duplicate_Tag',
        DESCRIPTION: 'Transaction_Duplicate_Description',
        TAX_CODE: 'Transaction_Duplicate_Tax_Code',
        REIMBURSABLE: 'Transaction_Duplicate_Reimburable',
        BILLABLE: 'Transaction_Duplicate_Billable',
        CONFIRMATION: 'Transaction_Duplicate_Confirmation',
    },

    IOU_SEND: {
        ADD_BANK_ACCOUNT: 'IOU_Send_Add_Bank_Account',
        ADD_DEBIT_CARD: 'IOU_Send_Add_Debit_Card',
        ENABLE_PAYMENTS: 'IOU_Send_Enable_Payments',
    },

    SETTINGS_CATEGORIES: {
        SETTINGS_CATEGORY_SETTINGS: 'Settings_Category_Settings',
        SETTINGS_CATEGORIES_SETTINGS: 'Settings_Categories_Settings',
        SETTINGS_CATEGORY_CREATE: 'Settings_Category_Create',
        SETTINGS_CATEGORY_EDIT: 'Settings_Category_Edit',
        SETTINGS_CATEGORIES_ROOT: 'Settings_Categories',
    },

    REPORT_SETTINGS: {
        ROOT: 'Report_Settings_Root',
        NAME: 'Report_Settings_Name',
        NOTIFICATION_PREFERENCES: 'Report_Settings_Notification_Preferences',
        WRITE_CAPABILITY: 'Report_Settings_Write_Capability',
        VISIBILITY: 'Report_Settings_Visibility',
    },

    NEW_TASK: {
        ROOT: 'NewTask_Root',
        TASK_ASSIGNEE_SELECTOR: 'NewTask_TaskAssigneeSelector',
        TASK_SHARE_DESTINATION_SELECTOR: 'NewTask_TaskShareDestinationSelector',
        DETAILS: 'NewTask_Details',
        TITLE: 'NewTask_Title',
        DESCRIPTION: 'NewTask_Description',
    },

    TASK: {
        TITLE: 'Task_Title',
        ASSIGNEE: 'Task_Assignee',
    },

    PRIVATE_NOTES: {
        LIST: 'PrivateNotes_List',
        EDIT: 'PrivateNotes_Edit',
    },

    REPORT_DETAILS: {
        ROOT: 'Report_Details_Root',
        SHARE_CODE: 'Report_Details_Share_Code',
        EXPORT: 'Report_Details_Export',
    },

    WORKSPACE: {
        ACCOUNTING: {
            ROOT: 'Policy_Accounting',
            QUICKBOOKS_ONLINE_IMPORT: 'Policy_Accounting_Quickbooks_Online_Import',
            QUICKBOOKS_ONLINE_CHART_OF_ACCOUNTS: 'Policy_Accounting_Quickbooks_Online_Import_Chart_Of_Accounts',
            QUICKBOOKS_ONLINE_CLASSES: 'Policy_Accounting_Quickbooks_Online_Import_Classes',
            QUICKBOOKS_ONLINE_CUSTOMERS: 'Policy_Accounting_Quickbooks_Online_Import_Customers',
            QUICKBOOKS_ONLINE_LOCATIONS: 'Policy_Accounting_Quickbooks_Online_Import_Locations',
            QUICKBOOKS_ONLINE_TAXES: 'Policy_Accounting_Quickbooks_Online_Import_Taxes',
            QUICKBOOKS_ONLINE_EXPORT: 'Workspace_Accounting_Quickbooks_Online_Export',
            QUICKBOOKS_ONLINE_EXPORT_DATE_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Date_Select',
            QUICKBOOKS_ONLINE_EXPORT_INVOICE_ACCOUNT_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Invoice_Account_Select',
            QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT: 'Workspace_Accounting_Quickbooks_Online_Export_Company_Card_Expense',
            QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Company_Card_Expense_Account_Select',
            QUICKBOOKS_ONLINE_NON_REIMBURSABLE_DEFAULT_VENDOR_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Non_Reimbursable_Default_Vendor_Select',
            QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_COMPANY_CARD_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Company_Card_Expense_Select',
            QUICKBOOKS_ONLINE_EXPORT_PREFERRED_EXPORTER: 'Workspace_Accounting_Quickbooks_Online_Export_Preferred_Exporter',
            QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES: 'Workspace_Accounting_Quickbooks_Online_Export_Out_Of_Pocket_Expenses',
            QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Out_Of_Pocket_Expenses_Select',
            QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_ACCOUNT_SELECT: 'Workspace_Accounting_Quickbooks_Online_Export_Out_Of_Pocket_Expenses_Account_Select',
            QUICKBOOKS_ONLINE_ADVANCED: 'Policy_Accounting_Quickbooks_Online_Advanced',
            QUICKBOOKS_ONLINE_ACCOUNT_SELECTOR: 'Policy_Accounting_Quickbooks_Online_Account_Selector',
            QUICKBOOKS_ONLINE_INVOICE_ACCOUNT_SELECTOR: 'Policy_Accounting_Quickbooks_Online_Invoice_Account_Selector',
            XERO_IMPORT: 'Policy_Accounting_Xero_Import',
            XERO_ORGANIZATION: 'Policy_Accounting_Xero_Customers',
            XERO_CHART_OF_ACCOUNTS: 'Policy_Accounting_Xero_Import_Chart_Of_Accounts',
            XERO_CUSTOMER: 'Policy_Acounting_Xero_Import_Customer',
            XERO_TAXES: 'Policy_Accounting_Xero_Taxes',
            XERO_TRACKING_CATEGORIES: 'Policy_Accounting_Xero_Tracking_Categories',
            XERO_MAP_TRACKING_CATEGORY: 'Policy_Accounting_Xero_Map_Tracking_Category',
            XERO_EXPORT: 'Policy_Accounting_Xero_Export',
            XERO_EXPORT_PURCHASE_BILL_DATE_SELECT: 'Policy_Accounting_Xero_Export_Purchase_Bill_Date_Select',
            XERO_ADVANCED: 'Policy_Accounting_Xero_Advanced',
            XERO_BILL_STATUS_SELECTOR: 'Policy_Accounting_Xero_Export_Bill_Status_Selector',
            XERO_INVOICE_ACCOUNT_SELECTOR: 'Policy_Accounting_Xero_Invoice_Account_Selector',
            XERO_EXPORT_PREFERRED_EXPORTER_SELECT: 'Workspace_Accounting_Xero_Export_Preferred_Exporter_Select',
            XERO_BILL_PAYMENT_ACCOUNT_SELECTOR: 'Policy_Accounting_Xero_Bill_Payment_Account_Selector',
            XERO_EXPORT_BANK_ACCOUNT_SELECT: 'Policy_Accounting_Xero_Export_Bank_Account_Select',
            NETSUITE_IMPORT_MAPPING: 'Policy_Accounting_NetSuite_Import_Mapping',
            NETSUITE_IMPORT_CUSTOM_FIELD: 'Policy_Accounting_NetSuite_Import_Custom_Field',
            NETSUITE_IMPORT_CUSTOM_FIELD_VIEW: 'Policy_Accounting_NetSuite_Import_Custom_Field_View',
            NETSUITE_IMPORT_CUSTOM_FIELD_EDIT: 'Policy_Accounting_NetSuite_Import_Custom_Field_Edit',
            NETSUITE_IMPORT_CUSTOM_LIST_ADD: 'Policy_Accounting_NetSuite_Import_Custom_List_Add',
            NETSUITE_IMPORT_CUSTOM_SEGMENT_ADD: 'Policy_Accounting_NetSuite_Import_Custom_Segment_Add',
            NETSUITE_IMPORT_CUSTOMERS_OR_PROJECTS: 'Policy_Accounting_NetSuite_Import_CustomersOrProjects',
            NETSUITE_IMPORT_CUSTOMERS_OR_PROJECTS_SELECT: 'Policy_Accounting_NetSuite_Import_CustomersOrProjects_Select',
            NETSUITE_REUSE_EXISTING_CONNECTIONS: 'Policy_Accounting_NetSuite_Reuse_Existing_Connections',
            NETSUITE_TOKEN_INPUT: 'Policy_Accounting_NetSuite_Token_Input',
            NETSUITE_SUBSIDIARY_SELECTOR: 'Policy_Accounting_NetSuite_Subsidiary_Selector',
            NETSUITE_IMPORT: 'Policy_Accounting_NetSuite_Import',
            NETSUITE_EXPORT: 'Policy_Accounting_NetSuite_Export',
            NETSUITE_PREFERRED_EXPORTER_SELECT: 'Policy_Accounting_NetSuite_Preferred_Exporter_Select',
            NETSUITE_DATE_SELECT: 'Policy_Accounting_NetSuite_Date_Select',
            NETSUITE_EXPORT_EXPENSES: 'Policy_Accounting_NetSuite_Export_Expenses',
            NETSUITE_EXPORT_EXPENSES_DESTINATION_SELECT: 'Policy_Accounting_NetSuite_Export_Expenses_Destination_Select',
            NETSUITE_EXPORT_EXPENSES_VENDOR_SELECT: 'Policy_Accounting_NetSuite_Export_Expenses_Vendor_Select',
            NETSUITE_EXPORT_EXPENSES_PAYABLE_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Export_Expenses_Payable_Account_Select',
            NETSUITE_EXPORT_EXPENSES_JOURNAL_POSTING_PREFERENCE_SELECT: 'Policy_Accounting_NetSuite_Export_Expenses_Journal_Posting_Preference_Select',
            NETSUITE_RECEIVABLE_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Receivable_Account_Select',
            NETSUITE_INVOICE_ITEM_PREFERENCE_SELECT: 'Policy_Accounting_NetSuite_Invoice_Item_Preference_Select',
            NETSUITE_INVOICE_ITEM_SELECT: 'Policy_Accounting_NetSuite_Invoice_Item_Select',
            NETSUITE_TAX_POSTING_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Tax_Posting_Account_Select',
            NETSUITE_PROVINCIAL_TAX_POSTING_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Provincial_Tax_Posting_Account_Select',
            NETSUITE_ADVANCED: 'Policy_Accounting_NetSuite_Advanced',
            NETSUITE_REIMBURSEMENT_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Reimbursement_Account_Select',
            NETSUITE_COLLECTION_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Collection_Account_Select',
            NETSUITE_EXPENSE_REPORT_APPROVAL_LEVEL_SELECT: 'Policy_Accounting_NetSuite_Expense_Report_Approval_Level_Select',
            NETSUITE_VENDOR_BILL_APPROVAL_LEVEL_SELECT: 'Policy_Accounting_NetSuite_Vendor_Bill_Approval_Level_Select',
            NETSUITE_JOURNAL_ENTRY_APPROVAL_LEVEL_SELECT: 'Policy_Accounting_NetSuite_Journal_Entry_Approval_Level_Select',
            NETSUITE_APPROVAL_ACCOUNT_SELECT: 'Policy_Accounting_NetSuite_Approval_Account_Select',
            NETSUITE_CUSTOM_FORM_ID: 'Policy_Accounting_NetSuite_Custom_Form_ID',
            SAGE_INTACCT_PREREQUISITES: 'Policy_Accounting_Sage_Intacct_Prerequisites',
            ENTER_SAGE_INTACCT_CREDENTIALS: 'Policy_Enter_Sage_Intacct_Credentials',
            EXISTING_SAGE_INTACCT_CONNECTIONS: 'Policy_Existing_Sage_Intacct_Connections',
            SAGE_INTACCT_ENTITY: 'Policy_Sage_Intacct_Entity',
            SAGE_INTACCT_IMPORT: 'Policy_Accounting_Sage_Intacct_Import',
            SAGE_INTACCT_TOGGLE_MAPPING: 'Policy_Accounting_Sage_Intacct_Toggle_Mapping',
            SAGE_INTACCT_MAPPING_TYPE: 'Policy_Accounting_Sage_Intacct_Mapping_Type',
            SAGE_INTACCT_USER_DIMENSIONS: 'Policy_Accounting_Sage_Intacct_User_Dimensions',
            SAGE_INTACCT_ADD_USER_DIMENSION: 'Policy_Accounting_Sage_Intacct_Add_User_Dimension',
            SAGE_INTACCT_EDIT_USER_DIMENSION: 'Policy_Accounting_Sage_Intacct_Edit_User_Dimension',
            SAGE_INTACCT_EXPORT: 'Policy_Accounting_Sage_Intacct_Export',
            SAGE_INTACCT_PREFERRED_EXPORTER: 'Policy_Accounting_Sage_Intacct_Preferred_Exporter',
            SAGE_INTACCT_EXPORT_DATE: 'Policy_Accounting_Sage_Intacct_Export_Date',
            SAGE_INTACCT_REIMBURSABLE_EXPENSES: 'Policy_Accounting_Sage_Intacct_Reimbursable_Expenses',
            SAGE_INTACCT_NON_REIMBURSABLE_EXPENSES: 'Policy_Accounting_Sage_Intacct_Non_Reimbursable_Expenses',
            SAGE_INTACCT_DEFAULT_VENDOR: 'Policy_Accounting_Sage_Intacct_Default_Vendor',
            SAGE_INTACCT_NON_REIMBURSABLE_CREDIT_CARD_ACCOUNT: 'Policy_Accounting_Sage_Intacct_Non_Reimbursable_Credit_Card_Account',
            SAGE_INTACCT_ADVANCED: 'Policy_Accounting_Sage_Intacct_Advanced',
            SAGE_INTACCT_PAYMENT_ACCOUNT: 'Policy_Accounting_Sage_Intacct_Payment_Account',
            CARD_RECONCILIATION: 'Policy_Accounting_Card_Reconciliation',
            RECONCILIATION_ACCOUNT_SETTINGS: 'Policy_Accounting_Reconciliation_Account_Settings',
        },
        INITIAL: 'Workspace_Initial',
        PROFILE: 'Workspace_Profile',
        CARD: 'Workspace_Card',
        REIMBURSE: 'Workspace_Reimburse',
        RATE_AND_UNIT: 'Workspace_RateAndUnit',
        RATE_AND_UNIT_RATE: 'Workspace_RateAndUnit_Rate',
        RATE_AND_UNIT_UNIT: 'Workspace_RateAndUnit_Unit',
        COMPANY_CARDS: 'Workspace_CompanyCards',
        COMPANY_CARDS_ASSIGN_CARD: 'Workspace_CompanyCards_AssignCard',
        COMPANY_CARDS_SELECT_FEED: 'Workspace_CompanyCards_Select_Feed',
        COMPANY_CARDS_ADD_NEW: 'Workspace_CompanyCards_New',
        COMPANY_CARDS_TYPE: 'Workspace_CompanyCards_Type',
        COMPANY_CARDS_INSTRUCTIONS: 'Workspace_CompanyCards_Instructions',
        COMPANY_CARDS_NAME: 'Workspace_CompanyCards_Name',
        COMPANY_CARDS_DETAILS: 'Workspace_CompanyCards_Details',
        COMPANY_CARDS_SETTINGS: 'Workspace_CompanyCards_Settings',
        COMPANY_CARDS_SETTINGS_FEED_NAME: 'Workspace_CompanyCards_Settings_Feed_Name',
        COMPANY_CARD_DETAILS: 'Workspace_CompanyCard_Details',
        COMPANY_CARD_NAME: 'Workspace_CompanyCard_Name',
        COMPANY_CARD_EXPORT: 'Workspace_CompanyCard_Export',
        EXPENSIFY_CARD: 'Workspace_ExpensifyCard',
        EXPENSIFY_CARD_DETAILS: 'Workspace_ExpensifyCard_Details',
        EXPENSIFY_CARD_LIMIT: 'Workspace_ExpensifyCard_Limit',
        EXPENSIFY_CARD_ISSUE_NEW: 'Workspace_ExpensifyCard_New',
        EXPENSIFY_CARD_NAME: 'Workspace_ExpensifyCard_Name',
        EXPENSIFY_CARD_LIMIT_TYPE: 'Workspace_ExpensifyCard_LimitType',
        EXPENSIFY_CARD_BANK_ACCOUNT: 'Workspace_ExpensifyCard_BankAccount',
        EXPENSIFY_CARD_SETTINGS: 'Workspace_ExpensifyCard_Settings',
        EXPENSIFY_CARD_SETTINGS_ACCOUNT: 'Workspace_ExpensifyCard_Settings_Account',
        EXPENSIFY_CARD_SETTINGS_FREQUENCY: 'Workspace_ExpensifyCard_Settings_Frequency',
        BILLS: 'Workspace_Bills',
        INVOICES: 'Workspace_Invoices',
        INVOICES_COMPANY_NAME: 'Workspace_Invoices_Company_Name',
        INVOICES_COMPANY_WEBSITE: 'Workspace_Invoices_Company_Website',
        TRAVEL: 'Workspace_Travel',
        MEMBERS: 'Workspace_Members',
        INVITE: 'Workspace_Invite',
        INVITE_MESSAGE: 'Workspace_Invite_Message',
        CATEGORIES: 'Workspace_Categories',
        TAGS: 'Workspace_Tags',
        TAGS_SETTINGS: 'Tags_Settings',
        TAGS_EDIT: 'Tags_Edit',
        TAG_EDIT: 'Tag_Edit',
        TAXES: 'Workspace_Taxes',
        REPORT_FIELDS: 'Workspace_ReportFields',
        REPORT_FIELDS_SETTINGS: 'Workspace_ReportFields_Settings',
        REPORT_FIELDS_CREATE: 'Workspace_ReportFields_Create',
        REPORT_FIELDS_LIST_VALUES: 'Workspace_ReportFields_ListValues',
        REPORT_FIELDS_ADD_VALUE: 'Workspace_ReportFields_AddValue',
        REPORT_FIELDS_VALUE_SETTINGS: 'Workspace_ReportFields_ValueSettings',
        REPORT_FIELDS_EDIT_VALUE: 'Workspace_ReportFields_EditValue',
        REPORT_FIELDS_EDIT_INITIAL_VALUE: 'Workspace_ReportFields_EditInitialValue',
        TAX_EDIT: 'Workspace_Tax_Edit',
        TAX_NAME: 'Workspace_Tax_Name',
        TAX_VALUE: 'Workspace_Tax_Value',
        TAX_CODE: 'Workspace_Tax_Code',
        TAXES_SETTINGS: 'Workspace_Taxes_Settings',
        TAXES_SETTINGS_CUSTOM_TAX_NAME: 'Workspace_Taxes_Settings_CustomTaxName',
        TAXES_SETTINGS_WORKSPACE_CURRENCY_DEFAULT: 'Workspace_Taxes_Settings_WorkspaceCurrency',
        TAXES_SETTINGS_FOREIGN_CURRENCY_DEFAULT: 'Workspace_Taxes_Settings_ForeignCurrency',
        TAX_CREATE: 'Workspace_Tax_Create',
        TAG_CREATE: 'Tag_Create',
        TAG_SETTINGS: 'Tag_Settings',
        TAG_APPROVER: 'Tag_Approver',
        TAG_LIST_VIEW: 'Tag_List_View',
        TAG_GL_CODE: 'Tag_GL_Code',
        CURRENCY: 'Workspace_Profile_Currency',
        ADDRESS: 'Workspace_Profile_Address',
        WORKFLOWS: 'Workspace_Workflows',
        WORKFLOWS_PAYER: 'Workspace_Workflows_Payer',
        WORKFLOWS_APPROVALS_NEW: 'Workspace_Approvals_New',
        WORKFLOWS_APPROVALS_EDIT: 'Workspace_Approvals_Edit',
        WORKFLOWS_APPROVALS_EXPENSES_FROM: 'Workspace_Workflows_Approvals_Expenses_From',
        WORKFLOWS_APPROVALS_APPROVER: 'Workspace_Workflows_Approvals_Approver',
        WORKFLOWS_AUTO_REPORTING_FREQUENCY: 'Workspace_Workflows_Auto_Reporting_Frequency',
        WORKFLOWS_AUTO_REPORTING_MONTHLY_OFFSET: 'Workspace_Workflows_Auto_Reporting_Monthly_Offset',
        DESCRIPTION: 'Workspace_Profile_Description',
        SHARE: 'Workspace_Profile_Share',
        NAME: 'Workspace_Profile_Name',
        CATEGORY_CREATE: 'Category_Create',
        CATEGORY_EDIT: 'Category_Edit',
        CATEGORY_PAYROLL_CODE: 'Category_Payroll_Code',
        CATEGORY_GL_CODE: 'Category_GL_Code',
        CATEGORY_SETTINGS: 'Category_Settings',
        CATEGORY_DEFAULT_TAX_RATE: 'Category_Default_Tax_Rate',
        CATEGORY_FLAG_AMOUNTS_OVER: 'Category_Flag_Amounts_Over',
        CATEGORY_DESCRIPTION_HINT: 'Category_Description_Hint',
        CATEGORY_APPROVER: 'Category_Approver',
        CATEGORY_REQUIRE_RECEIPTS_OVER: 'Category_Require_Receipts_Over',
        CATEGORIES_SETTINGS: 'Categories_Settings',
        CATEGORIES_IMPORT: 'Categories_Import',
        CATEGORIES_IMPORTED: 'Categories_Imported',
        MORE_FEATURES: 'Workspace_More_Features',
        MEMBER_DETAILS: 'Workspace_Member_Details',
        OWNER_CHANGE_CHECK: 'Workspace_Owner_Change_Check',
        OWNER_CHANGE_SUCCESS: 'Workspace_Owner_Change_Success',
        OWNER_CHANGE_ERROR: 'Workspace_Owner_Change_Error',
        DISTANCE_RATES: 'Distance_Rates',
        CREATE_DISTANCE_RATE: 'Create_Distance_Rate',
        DISTANCE_RATES_SETTINGS: 'Distance_Rates_Settings',
        DISTANCE_RATE_DETAILS: 'Distance_Rate_Details',
        DISTANCE_RATE_EDIT: 'Distance_Rate_Edit',
        DISTANCE_RATE_TAX_RECLAIMABLE_ON_EDIT: 'Distance_Rate_Tax_Reclaimable_On_Edit',
        DISTANCE_RATE_TAX_RATE_EDIT: 'Distance_Rate_Tax_Rate_Edit',
        UPGRADE: 'Workspace_Upgrade',
        RULES: 'Policy_Rules',
        RULES_CUSTOM_NAME: 'Rules_Custom_Name',
        RULES_AUTO_APPROVE_REPORTS_UNDER: 'Rules_Auto_Approve_Reports_Under',
        RULES_RANDOM_REPORT_AUDIT: 'Rules_Random_Report_Audit',
        RULES_AUTO_PAY_REPORTS_UNDER: 'Rules_AutoPay_Reports_Under',
        RULES_RECEIPT_REQUIRED_AMOUNT: 'Rules_Receipt_Required_Amount',
        RULES_MAX_EXPENSE_AMOUNT: 'Rules_Max_Expense_Amount',
        RULES_MAX_EXPENSE_AGE: 'Rules_Max_Expense_Age',
        RULES_BILLABLE_DEFAULT: 'Rules_Billable_Default',
    },

    EDIT_REQUEST: {
        CURRENCY: 'EditRequest_Currency',
        REPORT_FIELD: 'EditRequest_ReportField',
    },

    NEW_CHAT: {
        ROOT: 'NewChat_Root',
        NEW_CHAT: 'chat',
        NEW_CHAT_CONFIRM: 'NewChat_Confirm',
        NEW_CHAT_EDIT_NAME: 'NewChat_Edit_Name',
        NEW_ROOM: 'room',
    },

    SPLIT_DETAILS: {
        ROOT: 'SplitDetails_Root',
        EDIT_REQUEST: 'SplitDetails_Edit_Request',
        EDIT_CURRENCY: 'SplitDetails_Edit_Currency',
    },

    ONBOARDING: {
        PERSONAL_DETAILS: 'Onboarding_Personal_Details',
        PURPOSE: 'Onboarding_Purpose',
        WORK: 'Onboarding_Work',
    },

    WELCOME_VIDEO: {
        ROOT: 'Welcome_Video_Root',
    },

    EXPLANATION_MODAL: {
        ROOT: 'Explanation_Modal_Root',
    },

    I_KNOW_A_TEACHER: 'I_Know_A_Teacher',
    INTRO_SCHOOL_PRINCIPAL: 'Intro_School_Principal',
    I_AM_A_TEACHER: 'I_Am_A_Teacher',
    ENABLE_PAYMENTS_ROOT: 'EnablePayments_Root',
    ADD_PERSONAL_BANK_ACCOUNT_ROOT: 'AddPersonalBankAccount_Root',
    REIMBURSEMENT_ACCOUNT_ROOT: 'Reimbursement_Account_Root',
    WALLET_STATEMENT_ROOT: 'WalletStatement_Root',
    SIGN_IN_ROOT: 'SignIn_Root',
    DETAILS_ROOT: 'Details_Root',
    PROFILE_ROOT: 'Profile_Root',
    PROCESS_MONEY_REQUEST_HOLD_ROOT: 'ProcessMoneyRequestHold_Root',
    REPORT_DESCRIPTION_ROOT: 'Report_Description_Root',
    REPORT_PARTICIPANTS: {
        ROOT: 'ReportParticipants_Root',
        INVITE: 'ReportParticipants_Invite',
        DETAILS: 'ReportParticipants_Details',
        ROLE: 'ReportParticipants_Role',
    },
    ROOM_MEMBERS: {
        ROOT: 'RoomMembers_Root',
        INVITE: 'RoomMembers_Invite',
        DETAILS: 'RoomMember_Details',
    },
    FLAG_COMMENT_ROOT: 'FlagComment_Root',
    REIMBURSEMENT_ACCOUNT: 'ReimbursementAccount',
    GET_ASSISTANCE: 'GetAssistance',
    REFERRAL_DETAILS: 'Referral_Details',
    KEYBOARD_SHORTCUTS: 'KeyboardShortcuts',
    TRANSACTION_RECEIPT: 'TransactionReceipt',
    FEATURE_TRAINING_ROOT: 'FeatureTraining_Root',
    RESTRICTED_ACTION_ROOT: 'RestrictedAction_Root',
    MISSING_PERSONAL_DETAILS_ROOT: 'MissingPersonalDetails_Root',
} as const;

type Screen = DeepValueOf<typeof SCREENS>;

export default SCREENS;
export {PROTECTED_SCREENS};
export type {Screen};
