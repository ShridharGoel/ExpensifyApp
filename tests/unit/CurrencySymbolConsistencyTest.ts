import Onyx from 'react-native-onyx';
import CONST from '@src/CONST';
import * as CurrencyUtils from '@src/libs/CurrencyUtils';
import IntlStore from '@src/languages/IntlStore';
import ONYXKEYS from '@src/ONYXKEYS';
import waitForBatchedUpdates from '../utils/waitForBatchedUpdates';
import currencyList from './currencyList.json';

/**
 * Test to ensure currency symbol consistency for various currencies
 */
describe('Currency Symbol Consistency', () => {
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

    it('should use currency list symbols for all formatting functions', () => {
        const testCases = [
            { currency: CONST.CURRENCY.USD, expectedSymbol: '$' },
            { currency: CONST.CURRENCY.CAD, expectedSymbol: 'C$' },
            { currency: CONST.CURRENCY.AUD, expectedSymbol: 'A$' },
            { currency: CONST.CURRENCY.EUR, expectedSymbol: '€' },
            { currency: CONST.CURRENCY.GBP, expectedSymbol: '£' },
        ];

        testCases.forEach(({ currency, expectedSymbol }) => {
            const currencySymbol = CurrencyUtils.getCurrencySymbol(currency);
            expect(currencySymbol).toBe(expectedSymbol);

            // Test all three formatting functions use the same symbol
            const formatted1 = CurrencyUtils.convertToDisplayString(2500, currency);
            const formatted2 = CurrencyUtils.convertAmountToDisplayString(2500, currency);
            const formatted3 = CurrencyUtils.convertToShortDisplayString(2500, currency);

            // All should start with the expected symbol
            expect(formatted1).toMatch(new RegExp(`^${expectedSymbol.replace('$', '\\$')}`));
            expect(formatted2).toMatch(new RegExp(`^${expectedSymbol.replace('$', '\\$')}`));
            expect(formatted3).toMatch(new RegExp(`^${expectedSymbol.replace('$', '\\$')}`));
        });
    });
});
