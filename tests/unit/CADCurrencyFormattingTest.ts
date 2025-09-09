import Onyx from 'react-native-onyx';
import CONST from '@src/CONST';
import * as CurrencyUtils from '@src/libs/CurrencyUtils';
import IntlStore from '@src/languages/IntlStore';
import ONYXKEYS from '@src/ONYXKEYS';
import waitForBatchedUpdates from '../utils/waitForBatchedUpdates';
import currencyList from './currencyList.json';

/**
 * Test to reproduce the CAD currency formatting inconsistency issue
 * Expected: C$25.00 (consistent)
 * Actual: Sometimes CA$25.00, sometimes C$25.00
 */
describe('CAD Currency Formatting Consistency', () => {
    beforeAll(() => {
        Onyx.init({
            keys: {
                NVP_PREFERRED_LOCALE: ONYXKEYS.NVP_PREFERRED_LOCALE,
                CURRENCY_LIST: ONYXKEYS.CURRENCY_LIST,
            },
            initialKeyStates: {
                [ONYXKEYS.NVP_PREFERRED_LOCALE]: CONST.LOCALES.DEFAULT,
                [ONYXKEYS.CURRENCY_LIST]: currencyList,
            },
        });
        return waitForBatchedUpdates();
    });

    beforeEach(() => {
        return IntlStore.load(CONST.LOCALES.EN);
    });

    afterEach(() => Onyx.clear());

    it('should consistently format CAD currency amounts with C$ symbol', () => {
        const amount = 2500; // $25.00 in cents
        const currency = CONST.CURRENCY.CAD;

        // Test convertAmountToDisplayString (used in violation messages)
        const formattedAmountViolation = CurrencyUtils.convertAmountToDisplayString(amount, currency);
        
        // Test convertToDisplayString (used elsewhere)
        const formattedAmountGeneral = CurrencyUtils.convertToDisplayString(amount, currency);

        // Both should use the same currency symbol format
        // Expected: C$25.00
        expect(formattedAmountViolation).toMatch(/^C\$25\.00$/);
        expect(formattedAmountGeneral).toMatch(/^C\$25\.00$/);
        
        // They should be consistent with each other
        expect(formattedAmountViolation.replace('$25.00', '')).toBe(formattedAmountGeneral.replace('$25.00', ''));
    });

    it('should return the correct currency symbol for CAD from currency list', () => {
        const cadSymbol = CurrencyUtils.getCurrencySymbol(CONST.CURRENCY.CAD);
        // The currency list should define CAD with C$ symbol
        expect(cadSymbol).toBe('C$');
    });

    it('should return consistent localized currency symbol for CAD', () => {
        const localizedSymbol = CurrencyUtils.getLocalizedCurrencySymbol(CONST.CURRENCY.CAD);
        // This might return CA$ or C$ depending on the Intl implementation
        expect(localizedSymbol).toMatch(/^(CA\$|C\$)$/);
    });

    it('should format CAD amounts correctly for violations messages', () => {
        // This simulates how the violations system formats receipt required messages
        const maxExpenseAmountNoReceipt = 2500; // $25.00 in cents
        const outputCurrency = CONST.CURRENCY.CAD;
        
        // This is what ViolationsUtils.ts does for receipt required violations
        const formattedLimit = CurrencyUtils.convertAmountToDisplayString(maxExpenseAmountNoReceipt, outputCurrency);
        
        // Should consistently show C$25.00
        expect(formattedLimit).toBe('C$25.00');
    });
});
