# Proposal: Adding "Equal To" Option to Amount Filters

## Please re-state the problem that we are trying to solve in this issue.

The amount filters (Amount, Total, and Purchase amount) in the search functionality currently only support "Greater than" and "Less than" options. Users need an "Equal to" option to perform exact amount searches, similar to how date filters offer "On", "After", and "Before" options. Additionally, the interface should follow existing UI patterns with proper button placement and input auto-focusing.

## What is the root cause of that problem?

The root cause is that the amount filtering system was originally designed with only range-based filtering in mind (greater/less than), not exact matching. The current implementation lacks:

* An "Equal to" operator in the AMOUNT_MODIFIERS constant
* Corresponding form fields in the search filter form definitions
* UI components to display and manage the "Equal to" filtering option
* Translation strings for the new "Equal to" option
* Integration in the query builder logic to properly handle exact amount matches

## What changes do you think we should make in order to solve the problem?

I've analyzed the codebase and identified that we already have a good architecture in place with the `SearchFiltersAmountBase` component. This component already implements a two-component architecture pattern similar to the date filters, with a menu interface and a form interface.

The implementation approach is as follows:

1. Add EQUAL_TO to AMOUNT_MODIFIERS in CONST.ts:
```typescript
AMOUNT_MODIFIERS: {
    LESS_THAN: 'LessThan',
    GREATER_THAN: 'GreaterThan',
    EQUAL_TO: 'EqualTo',
},
```

2. Add translations for the new "Equal to" option:
```typescript
amount: {
    lessThan: ({amount}: OptionalParam<RequestAmountParams> = {}) => `Less than ${amount ?? ''}`,
    greaterThan: ({amount}: OptionalParam<RequestAmountParams> = {}) => `Greater than ${amount ?? ''}`,
    equalTo: ({amount}: OptionalParam<RequestAmountParams> = {}) => `Equal to ${amount ?? ''}`,
    between: ({greaterThan, lessThan}: FiltersAmountBetweenParams) => `Between ${greaterThan} and ${lessThan}`,
},
```

3. Update the `SearchFiltersAmountBase` component to properly handle the Equal To option:

The good news is that the component already supports the Equal To option! Looking at the code, I found:

```typescript
// Already exists in SearchFiltersAmountBase.tsx
const equalTo = searchAdvancedFiltersForm?.[`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO}`];
const equalToFormattedAmount = equalTo ? convertToFrontendAmountAsString(Number(equalTo)) : undefined;

// Already exists in the menu UI
<MenuItem
    title="Equal to"
    description={equalToFormattedAmount}
    onPress={() => handleModifierSelect(CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO)}
    shouldShowRightIcon
/>

// Already exists in the title function
case CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO:
    return 'Equal to';
```

4. Ensure the SearchQueryUtils properly handles the Equal To option:

The `buildAmountFilterQuery` function in SearchQueryUtils.ts already supports the Equal To option:

```typescript
function buildAmountFilterQuery(filterKey: SearchAmountFilterKeys, filterValues: Partial<SearchAdvancedFiltersForm>) {
    const lessThan = filterValues[`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.LESS_THAN}`];
    const greaterThan = filterValues[`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN}`];
    const equalTo = filterValues[`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO}`];

    let amountFilter = '';
    if (equalTo) {
        amountFilter += `${filterKey}:${equalTo}`;
    }
    if (greaterThan) {
        amountFilter += `${filterKey}>${greaterThan}`;
    }
    if (lessThan && greaterThan) {
        amountFilter += ' ';
    }
    if (lessThan) {
        amountFilter += `${filterKey}<${lessThan}`;
    }

    return amountFilter;
}
```

5. The reset function in SearchFiltersAmountBase already handles resetting the Equal To option:

```typescript
const reset = useCallback(() => {
    // Reset all amount filters for this filterKey
    updateAdvancedFilters({
        [`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO}`]: null,
        [`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN}`]: null,
        [`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.LESS_THAN}`]: null,
    });
}, [filterKey]);
```

Upon reviewing the codebase, it appears that most of the implementation for the "Equal to" option already exists! The code is already set up with the necessary components, functions, and UI elements to support this feature. The primary issue seems to be that the `EQUAL_TO` constant is either missing from `CONST.SEARCH.AMOUNT_MODIFIERS` or was added but never properly wired up in the translation files.

The solution is much simpler than initially thought:

1. Ensure `EQUAL_TO` is defined in `CONST.SEARCH.AMOUNT_MODIFIERS`
2. Add the missing translation for "Equal to" in the translation files
3. Test to ensure that the feature works as expected

This is a great example of how well-structured code makes adding new features easier. The existing architecture has already anticipated this need and includes most of the necessary code.
