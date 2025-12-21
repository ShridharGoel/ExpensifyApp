import type {ValueOf} from 'type-fest';
import CONST from '@src/CONST';

type SearchTransactionHighlight = {
    /** Transaction IDs that should be highlighted in the search table */
    transactionIDs?: string[];

    /** The search data type these highlights apply to */
    type?: ValueOf<typeof CONST.SEARCH.DATA_TYPES>;
};

export default SearchTransactionHighlight;
