import React from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import * as SearchUtils from '@libs/SearchUtils';
import type {SearchColumnType, SortOrder} from '@libs/SearchUtils';
import CONST from '@src/CONST';
import type {TranslationPaths} from '@src/languages/types';
import type * as OnyxTypes from '@src/types/onyx';
import SortableHeaderText from './SortableHeaderText';

type SearchColumnConfig = {
    columnName: SearchColumnType;
    translationKey: TranslationPaths;
    isColumnSortable?: boolean;
    shouldShow: (data: OnyxTypes.SearchResults['data']) => boolean;
};

const SearchColumns: SearchColumnConfig[] = [
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.RECEIPT,
        translationKey: 'common.receipt',
        shouldShow: () => true,
        isColumnSortable: false,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.DATE,
        translationKey: 'common.date',
        shouldShow: () => true,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.MERCHANT,
        translationKey: 'common.merchant',
        shouldShow: (data: OnyxTypes.SearchResults['data']) => SearchUtils.getShouldShowMerchant(data),
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.DESCRIPTION,
        translationKey: 'common.description',
        shouldShow: (data: OnyxTypes.SearchResults['data']) => !SearchUtils.getShouldShowMerchant(data),
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.FROM,
        translationKey: 'common.from',
        shouldShow: () => true,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.TO,
        translationKey: 'common.to',
        shouldShow: () => true,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.CATEGORY,
        translationKey: 'common.category',
        shouldShow: () => true,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.TAG,
        translationKey: 'common.tag',
        shouldShow: () => true,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.TAX_AMOUNT,
        translationKey: 'common.tax',
        shouldShow: () => true,
        isColumnSortable: false,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.TOTAL_AMOUNT,
        translationKey: 'common.total',
        shouldShow: () => true,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.TYPE,
        translationKey: 'common.type',
        shouldShow: () => true,
        isColumnSortable: false,
    },
    {
        columnName: CONST.SEARCH_TABLE_COLUMNS.ACTION,
        translationKey: 'common.action',
        shouldShow: () => true,
        isColumnSortable: false,
    },
];

type SearchTableHeaderProps = {
    data: OnyxTypes.SearchResults['data'];
    sortBy?: SearchColumnType;
    sortOrder?: SortOrder;
    isSortingAllowed: boolean;
    onSortPress: (column: SearchColumnType, order: SortOrder) => void;
    doesAtleastOneExpenseBelongToAPastYear: boolean;
};

function SearchTableHeader({data, sortBy, sortOrder, isSortingAllowed, onSortPress, doesAtleastOneExpenseBelongToAPastYear}: SearchTableHeaderProps) {
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const {isSmallScreenWidth, isMediumScreenWidth} = useWindowDimensions();
    const {translate} = useLocalize();
    const displayNarrowVersion = isMediumScreenWidth || isSmallScreenWidth;

    if (displayNarrowVersion) {
        return;
    }

    return (
        <View style={[styles.ph5, styles.pb3]}>
            <View style={[styles.flex1, styles.flexRow, styles.gap3, styles.ph4]}>
                {SearchColumns.map(({columnName, translationKey, shouldShow, isColumnSortable}) => {
                    if (!shouldShow(data)) {
                        return null;
                    }

                    const isActive = sortBy === columnName;
                    const textStyle = columnName === CONST.SEARCH_TABLE_COLUMNS.RECEIPT ? StyleUtils.getTextOverflowStyle('clip') : null;
                    const isSortable = isSortingAllowed && isColumnSortable;

                    return (
                        <SortableHeaderText
                            key={translationKey}
                            text={translate(translationKey)}
                            textStyle={textStyle}
                            sortOrder={sortOrder ?? CONST.SORT_ORDER.ASC}
                            isActive={isActive}
                            containerStyle={[StyleUtils.getSearchTableColumnStyles(columnName, doesAtleastOneExpenseBelongToAPastYear)]}
                            isSortable={isSortable}
                            onPress={(order: SortOrder) => onSortPress(columnName, order)}
                        />
                    );
                })}
            </View>
        </View>
    );
}

SearchTableHeader.displayName = 'SearchTableHeader';

export default SearchTableHeader;
