import type {ValueOf} from 'type-fest';
import type CONST from '@src/CONST';

/** Assign card flow steps */
type AssignCardStep = ValueOf<typeof CONST.COMPANY_CARD.STEP>;

/** Data required to be sent to issue a new card */
type AssignCardData = {
    /** The email address of the assignee */
    email: string;

    /** Encrypted number of the selected card */
    encryptedCardNumber: string;

    /** Number of the selected card */
    cardNumber: string;

    /** The name of the feed */
    bankName: string;

    /** The name of the card */
    cardName: string;

    /** The transaction start date of the card */
    startDate: string;

    /** An option based on which the transaction start date is chosen */
    dateOption: string;
};

/** Model of assign card flow */
type AssignCard = {
    /** The current step of the flow */
    currentStep: AssignCardStep;

    /** Data required to be sent to assign a card */
    data: Partial<AssignCardData>;

    /** Whether the user is editing step */
    isEditing: boolean;
};

export type {AssignCard, AssignCardStep, AssignCardData};
