# Proposal

## Please re-state the problem that we are trying to solve in this issue.

The amount filters (Amount, Total, and Purchase amount) in the search functionality currently only support "Greater than" and "Less than" options. Users need an "Equal to" option to perform exact amount searches, similar to how date filters offer "On", "After", and "Before" options. Additionally, the interface should follow existing UI patterns with proper button placement and input auto-focusing.

## What is the root cause of that problem?

The root cause is that the amount filtering system was originally designed with only range-based filtering in mind (greater/less than), not exact matching. The current implementation lacks:

* An "Equal to" operator in the AMOUNT_MODIFIERS constant
* Corresponding form fields in the search filter form definitions
* A proper component architecture similar to the date filter implementation
* Consistent UI patterns with the date filter implementation
* Menu-based navigation for selecting filter types
* Proper layout for buttons at the bottom of the screen
* Auto-focusing behavior for input fields

## What changes do you think we should make in order to solve the problem?

We need to:

* Add the "Equal to" option to the AMOUNT_MODIFIERS constant
* Update the search form definitions to include the new filter option
* Refactor the amount filter implementation to use a Base/Page component pattern similar to date filters
* Create a menu-based interface for selecting filter types
* Ensure buttons are properly positioned at the bottom of the screen
* Implement auto-focus for amount input fields

Here's the implementation approach:

1. Add EQUAL_TO to AMOUNT_MODIFIERS:
```typescript
AMOUNT_MODIFIERS: {
    LESS_THAN: 'LessThan',
    GREATER_THAN: 'GreaterThan',
    EQUAL_TO: 'EqualTo',
},
```

2. Add translations:
```typescript
amount: {
    lessThan: ({amount}: OptionalParam<RequestAmountParams> = {}) => `Less than ${amount ?? ''}`,
    greaterThan: ({amount}: OptionalParam<RequestAmountParams> = {}) => `Greater than ${amount ?? ''}`,
    equalTo: ({amount}: OptionalParam<RequestAmountParams> = {}) => `Equal to ${amount ?? ''}`,
    between: ({greaterThan, lessThan}: FiltersAmountBetweenParams) => `Between ${greaterThan} and ${lessThan}`,
},
```

3. Create helper functions for title management and value formatting:
```typescript
const getTitle = () => {
    if (!selectedModifier) {
        return translate(title);
    }
    switch (selectedModifier) {
        case CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO:
            return 'Equal to';
        case CONST.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN:
            return translate('search.filters.amount.greaterThan');
        case CONST.SEARCH.AMOUNT_MODIFIERS.LESS_THAN:
            return translate('search.filters.amount.lessThan');
        default:
            return translate(title);
    }
};

const reset = useCallback(() => {
    // Reset all amount filters for this filterKey
    updateAdvancedFilters({
        [`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO}`]: null,
        [`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN}`]: null,
        [`${filterKey}${CONST.SEARCH.AMOUNT_MODIFIERS.LESS_THAN}`]: null,
    });
}, [filterKey]);

const save = useCallback(() => {
    // Just go back to the filters screen
    Navigation.goBack(ROUTES.SEARCH_ADVANCED_FILTERS.getRoute());
}, []);

const updateAmountFilter = (values: FormOnyxValues<typeof ONYXKEYS.FORMS.SEARCH_ADVANCED_FILTERS_FORM>) => {
    if (!selectedModifier) return;
    
    const fieldKey = `${filterKey}${selectedModifier}` as keyof typeof searchAdvancedFiltersForm;
    const amount = values[fieldKey];
    const backendAmount = amount ? convertToBackendAmount(Number(amount)) : '';
    updateAdvancedFilters({
        [fieldKey]: backendAmount?.toString(),
    });
    goBack();
};
```

4. Update SearchFiltersAmountBase to use a menu-based approach with three options:
```typescript
if (!selectedModifier) {
    return (
        <ScreenWrapper>
            <HeaderWithBackButton />
            <View style={[styles.flex1]}>
                <MenuItem
                    title="Equal to"
                    description={equalToFormattedAmount}
                    onPress={() => handleModifierSelect(CONST.SEARCH.AMOUNT_MODIFIERS.EQUAL_TO)}
                    shouldShowRightIcon
                />
                <MenuItem
                    title={translate('search.filters.amount.greaterThan')}
                    description={greaterThanFormattedAmount}
                    onPress={() => handleModifierSelect(CONST.SEARCH.AMOUNT_MODIFIERS.GREATER_THAN)}
                    shouldShowRightIcon
                />
                <MenuItem
                    title={translate('search.filters.amount.lessThan')}
                    description={lessThanFormattedAmount}
                    onPress={() => handleModifierSelect(CONST.SEARCH.AMOUNT_MODIFIERS.LESS_THAN)}
                    shouldShowRightIcon
                />
                <View style={styles.flexGrow1} />
                <Button
                    text={translate('common.reset')}
                    onPress={reset}
                    style={[styles.mh4, styles.mt4]}
                    large
                />
                <FormAlertWithSubmitButton
                    buttonText={translate('common.save')}
                    containerStyles={[styles.m4, styles.mt3, styles.mb5]}
                    onSubmit={save}
                    enabledWhenOffline
                />
            </View>
        </ScreenWrapper>
    );
}
```

5. When a modifier is selected, show a single input form:
```typescript
return (
    <ScreenWrapper>
        <HeaderWithBackButton />
        <FormProvider>
            <View style={styles.mb5}>
                <InputWrapper
                    InputComponent={AmountWithoutCurrencyInput}
                    inputID={fieldKey}
                    name={fieldKey}
                    defaultValue={getCurrentValue()}
                    label={getTitle()}
                    accessibilityLabel={getTitle()}
                    role={CONST.ROLE.PRESENTATION}
                    ref={inputCallbackRef}
                    inputMode={CONST.INPUT_MODE.DECIMAL}
                    uncontrolled
                />
            </View>
        </FormProvider>
    </ScreenWrapper>
);
```

6. Add functions to handle navigation, saving and resetting:
```typescript
const goBack = () => {
    if (selectedModifier) {
        setSelectedModifier(null);
    } else {
        Navigation.goBack(ROUTES.SEARCH_ADVANCED_FILTERS.getRoute());
    }
};

```

7. Implement auto-focus for amount input fields:
```typescript
const handleModifierSelect = useCallback((modifier: string) => {
    setSelectedModifier(modifier);
}, []);
```

These changes will implement the "Equal to" option for amount filters, providing users with a complete set of filtering capabilities while maintaining a consistent UI pattern with the date filters.
