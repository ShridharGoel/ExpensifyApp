import Str from 'expensify-common/lib/str';
import Onyx from 'react-native-onyx';
import CONST from '@src/CONST';
import * as Session from '@src/libs/actions/Session';
import HttpUtils from '@src/libs/HttpUtils';
import * as NumberUtils from '@src/libs/NumberUtils';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Response as OnyxResponse, PersonalDetails, Report} from '@src/types/onyx';
import waitForBatchedUpdates from './waitForBatchedUpdates';

type MockFetch = ReturnType<typeof jest.fn> & {
    pause?: () => void;
    fail?: () => void;
    succeed?: () => void;
    resume?: () => Promise<void>;
};

type QueueItem = (value: Partial<Response> | PromiseLike<Partial<Response>>) => void;

type FormData = {
    entries: () => Array<[string, string | Blob]>;
};

type Listener = () => void;

function buildPersonalDetails(login: string, accountID: number, firstName = 'Test'): PersonalDetails {
    return {
        accountID,
        login,
        avatar: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/avatar_7.png',
        avatarThumbnail: 'https://d2k5nsl2zxldvw.cloudfront.net/images/avatars/avatar_7.png',
        displayName: `${firstName} User`,
        firstName,
        lastName: 'User',
        pronouns: '',
        timezone: CONST.DEFAULT_TIME_ZONE,
        phoneNumber: '',
    };
}

/**
 * Simulate signing in and make sure all API calls in this flow succeed. Every time we add
 * a mockImplementationOnce() we are altering what Network.post() will return.
 */
function signInWithTestUser(accountID = 1, login = 'test@user.com', password = 'Password1', authToken = 'asdfqwerty', firstName = 'Test') {
    const originalXhr = HttpUtils.xhr;

    HttpUtils.xhr = jest.fn().mockImplementation(() => {
        const mockedResponse: OnyxResponse = {
            onyxData: [
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.CREDENTIALS,
                    value: {
                        login,
                    },
                },
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.ACCOUNT,
                    value: {
                        validated: true,
                    },
                },
                {
                    onyxMethod: Onyx.METHOD.MERGE,
                    key: ONYXKEYS.PERSONAL_DETAILS_LIST,
                    value: {
                        [accountID]: buildPersonalDetails(login, accountID, firstName),
                    },
                },
            ],
            jsonCode: 200,
        };

        // Return a Promise that resolves with the mocked response
        return Promise.resolve(mockedResponse);
    });

    // Simulate user entering their login and populating the credentials.login
    Session.beginSignIn(login);
    return waitForBatchedUpdates()
        .then(() => {
            HttpUtils.xhr = jest.fn().mockImplementation(() => {
                const mockedResponse: OnyxResponse = {
                    onyxData: [
                        {
                            onyxMethod: Onyx.METHOD.MERGE,
                            key: ONYXKEYS.SESSION,
                            value: {
                                authToken,
                                accountID,
                                email: login,
                                encryptedAuthToken: authToken,
                            },
                        },
                        {
                            onyxMethod: Onyx.METHOD.MERGE,
                            key: ONYXKEYS.CREDENTIALS,
                            value: {
                                autoGeneratedLogin: Str.guid('expensify.cash-'),
                                autoGeneratedPassword: Str.guid(),
                            },
                        },
                        {
                            onyxMethod: Onyx.METHOD.MERGE,
                            key: ONYXKEYS.USER,
                            value: {
                                isUsingExpensifyCard: false,
                            },
                        },
                        {
                            onyxMethod: Onyx.METHOD.MERGE,
                            key: ONYXKEYS.BETAS,
                            value: ['all'],
                        },
                        {
                            onyxMethod: Onyx.METHOD.MERGE,
                            key: ONYXKEYS.NVP_PRIVATE_PUSH_NOTIFICATION_ID,
                            value: 'randomID',
                        },
                    ],
                    jsonCode: 200,
                };

                // Return a Promise that resolves with the mocked response
                return Promise.resolve(mockedResponse);
            });
            Session.signIn(password);
            return waitForBatchedUpdates();
        })
        .then(() => {
            HttpUtils.xhr = originalXhr;
        });
}

function signOutTestUser() {
    const originalXhr = HttpUtils.xhr;
    HttpUtils.xhr = jest.fn().mockImplementation(() => {
        const mockedResponse: OnyxResponse = {
            jsonCode: 200,
        };

        // Return a Promise that resolves with the mocked response
        return Promise.resolve(mockedResponse);
    });
    Session.signOutAndRedirectToSignIn();
    return waitForBatchedUpdates().then(() => (HttpUtils.xhr = originalXhr));
}

/**
 * Use for situations where fetch() is required. This mock is stateful and has some additional methods to control its behavior:
 *
 * - pause() – stop resolving promises until you call resume()
 * - resume() - flush the queue of promises, and start resolving new promises immediately
 * - fail() - start returning a failure response
 * - success() - go back to returning a success response
 */
function getGlobalFetchMock() {
    const queue: QueueItem[] = [];
    let isPaused = false;
    let shouldFail = false;

    const getResponse = (): Partial<Response> =>
        shouldFail
            ? {
                  ok: true,
                  json: () => Promise.resolve({jsonCode: 400}),
              }
            : {
                  ok: true,
                  json: () => Promise.resolve({jsonCode: 200}),
              };

    const mockFetch: MockFetch = jest.fn().mockImplementation(() => {
        if (!isPaused) {
            return Promise.resolve(getResponse());
        }
        return new Promise((resolve) => {
            queue.push(resolve);
        });
    });

    mockFetch.pause = () => (isPaused = true);
    mockFetch.resume = () => {
        isPaused = false;
        queue.forEach((resolve) => resolve(getResponse()));
        return waitForBatchedUpdates();
    };
    mockFetch.fail = () => (shouldFail = true);
    mockFetch.succeed = () => (shouldFail = false);

    return mockFetch as typeof fetch;
}

function setPersonalDetails(login: string, accountID: number) {
    Onyx.merge(ONYXKEYS.PERSONAL_DETAILS_LIST, {
        [accountID]: buildPersonalDetails(login, accountID),
    });
    return waitForBatchedUpdates();
}

function buildTestReportComment(created: string, actorAccountID: number, actionID: string | null = null, previousReportActionID: string | null = null) {
    const reportActionID = actionID ?? NumberUtils.rand64().toString();
    return {
        actionName: CONST.REPORT.ACTIONS.TYPE.ADD_COMMENT,
        person: [{type: 'TEXT', style: 'strong', text: 'User B'}],
        created,
        message: [{type: 'COMMENT', html: `Comment ${actionID}`, text: `Comment ${actionID}`}],
        reportActionID,
        actorAccountID,
        previousReportActionID,
    };
}

function assertFormDataMatchesObject(formData: FormData, obj: Report) {
    expect(Array.from(formData.entries()).reduce((memo, x) => ({...memo, [x[0]]: x[1]}), {})).toEqual(expect.objectContaining(obj));
}

/**
 * This is a helper function to create a mock for the addListener function of the react-navigation library.
 * The reason we need this is because we need to trigger the transitionEnd event in our tests to simulate
 * the transitionEnd event that is triggered when the screen transition animation is completed.
 *
 * @returns An object with two functions: triggerTransitionEnd and addListener
 */
const createAddListenerMock = () => {
    const transitionEndListeners: Listener[] = [];
    const triggerTransitionEnd = () => {
        transitionEndListeners.forEach((transitionEndListener) => transitionEndListener());
    };

    const addListener = jest.fn().mockImplementation((listener, callback) => {
        if (listener === 'transitionEnd') {
            transitionEndListeners.push(callback);
        }
        return () => {
            transitionEndListeners.filter((cb) => cb !== callback);
        };
    });

    return {triggerTransitionEnd, addListener};
};

export type {MockFetch};
export {assertFormDataMatchesObject, buildPersonalDetails, buildTestReportComment, createAddListenerMock, getGlobalFetchMock, setPersonalDetails, signInWithTestUser, signOutTestUser};
