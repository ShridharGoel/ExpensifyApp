import React from 'react';
import SearchFiltersAmountBase from '@components/Search/SearchFiltersAmountBase';
import CONST from '@src/CONST';

function SearchFiltersPurchaseAmountPage() {
    return (
        <SearchFiltersAmountBase
            filterKey={CONST.SEARCH.SYNTAX_FILTER_KEYS.PURCHASE_AMOUNT}
            title="common.purchaseAmount"
            testID={SearchFiltersPurchaseAmountPage.displayName}
        />
    );
}

SearchFiltersPurchaseAmountPage.displayName = 'SearchFiltersPurchaseAmountPage';

export default SearchFiltersPurchaseAmountPage;
