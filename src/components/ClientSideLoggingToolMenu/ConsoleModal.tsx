import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ListRenderItem, ListRenderItemInfo, View} from 'react-native';
import ConsolePage from "@pages/settings/AboutPage/ConsolePage";
import CONST from "@src/CONST";
import Modal from "@components/Modal";
import useWindowDimensions from "@hooks/useWindowDimensions";
import useStyleUtils from "@hooks/useStyleUtils";
import useThemeStyles from "@hooks/useThemeStyles";
import useLocalize from "@hooks/useLocalize";
import InvertedFlatList from "@components/InvertedFlatList";
import Text from "@components/Text";
import {CapturedLogs, Log} from "@src/types/onyx";
import {format} from "date-fns";
import {OnyxEntry, withOnyx} from "react-native-onyx";
import ONYXKEYS from "@src/ONYXKEYS";
import {createLog, parseStringifiedMessages, sanitizeConsoleInput} from "@libs/Console";
import {addLog} from "@userActions/Console";
import useKeyboardShortcut from "@hooks/useKeyboardShortcut";
import localFileDownload from "@libs/localFileDownload";
import localFileCreate from "@libs/localFileCreate";
import Navigation from "@navigation/Navigation";
import ROUTES from "@src/ROUTES";
import Button from "@components/Button";
import * as Expensicons from "@components/Icon/Expensicons";
import TextInput from "@components/TextInput";
import ConfirmModal from "@components/ConfirmModal";

type ConsoleModalOnyxProps = {
    /** Logs captured on the current device */
    capturedLogs: OnyxEntry<CapturedLogs>;

    /** Whether or not logs should be stored */
    shouldStoreLogs: OnyxEntry<boolean>;
};

type ConsoleModalProps = {
    /** Locally created file */
    isVisible: boolean
    /** Action to run when pressing Share button */
    onClose?: () => void;
} & ConsoleModalOnyxProps;


function ConsoleModal({capturedLogs, shouldStoreLogs, isVisible, onClose}: ConsoleModalProps) {
    const {windowWidth, windowHeight} = useWindowDimensions();
    const StyleUtils = useStyleUtils();
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const [input, setInput] = useState('');
    const [logs, setLogs] = useState(capturedLogs);
    const [isGeneratingLogsFile, setIsGeneratingLogsFile] = useState(false);
    const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);

    const logsList = useMemo(
        () =>
            Object.entries(logs ?? {})
                .map(([key, value]) => ({key, ...value}))
                .reverse(),
        [logs],
    );

    useEffect(() => {
        if (!shouldStoreLogs) {
            return;
        }

        setLogs((prevLogs) => ({...prevLogs, ...capturedLogs}));
    }, [capturedLogs, shouldStoreLogs]);

    const renderItem: ListRenderItem<Log> = useCallback(
        ({item}: ListRenderItemInfo<Log>) => {
            if (!item) {
                return null;
            }

            return (
                <View style={styles.mb2}>
                    <Text family="MONOSPACE">{`${format(new Date(item.time), CONST.DATE.FNS_DB_FORMAT_STRING)} ${item.message}`}</Text>
                </View>
            );
        },
        [styles.mb2],
    );

    const executeArbitraryCode = () => {
        const sanitizedInput = sanitizeConsoleInput(input);

        const output = createLog(sanitizedInput);
        output.forEach((log) => addLog(log));
        setInput('');
    };

    useKeyboardShortcut(CONST.KEYBOARD_SHORTCUTS.ENTER, executeArbitraryCode);

    const saveLogs = () => {
        const logsWithParsedMessages = parseStringifiedMessages(logsList);

        localFileDownload('logs', JSON.stringify(logsWithParsedMessages, null, 2));
    };

    const shareLogs = () => {
        setIsGeneratingLogsFile(true);
        const logsWithParsedMessages = parseStringifiedMessages(logsList);

        // Generate a file with the logs and pass its path to the list of reports to share it with
        localFileCreate('logs', JSON.stringify(logsWithParsedMessages, null, 2)).then(({path, size}) => {
            setIsGeneratingLogsFile(false);

            // if the file size is too large to send it as an attachment, show a modal and return
            if (size > CONST.API_ATTACHMENT_VALIDATIONS.MAX_SIZE) {
                setIsLimitModalVisible(true);

                return;
            }

            Navigation.navigate(ROUTES.SETTINGS_SHARE_LOG.getRoute(path));
        });
    };

    return (
        <Modal
            isVisible={isVisible && shouldStoreLogs}
            type={CONST.MODAL.MODAL_TYPE.CENTERED_SMALL_AND_UNSWIPEABLE}
            onClose={onClose}
        >
            <View style={[StyleUtils.getTestToolsModalStyle(windowWidth), {height: (windowHeight * 0.9)}]}>

                    <InvertedFlatList
                        data={logsList}
                        renderItem={renderItem}
                        contentContainerStyle={styles.p5}
                        ListEmptyComponent={<Text>{translate('initialSettingsPage.debugConsole.noLogsAvailable')}</Text>}
                    />

                <View style={[styles.dFlex, styles.flexRow, styles.m5]}>
                    <Button
                        text={translate('initialSettingsPage.debugConsole.saveLog')}
                        onPress={saveLogs}
                        large
                        icon={Expensicons.Download}
                        style={[styles.flex1, styles.mr1]}
                    />
                    <Button
                        text={translate('initialSettingsPage.debugConsole.shareLog')}
                        onPress={shareLogs}
                        large
                        icon={!isGeneratingLogsFile ? Expensicons.UploadAlt : undefined}
                        style={[styles.flex1, styles.ml1]}
                        isLoading={isGeneratingLogsFile}
                    />
                </View>
                <View style={[styles.mh5]}>
                    <TextInput
                        onChangeText={setInput}
                        value={input}
                        placeholder={translate('initialSettingsPage.debugConsole.enterCommand')}
                        autoGrowHeight
                        autoCorrect={false}
                        accessibilityRole="text"
                    />
                    <Button
                        success
                        text={translate('initialSettingsPage.debugConsole.execute')}
                        onPress={executeArbitraryCode}
                        style={[styles.mt5]}
                        large
                    />
                </View>
                <ConfirmModal
                    title={translate('initialSettingsPage.debugConsole.shareLog')}
                    isVisible={isLimitModalVisible}
                    onConfirm={() => setIsLimitModalVisible(false)}
                    prompt={translate('initialSettingsPage.debugConsole.logSizeTooLarge', {
                        size: CONST.API_ATTACHMENT_VALIDATIONS.MAX_SIZE / 1024 / 1024,
                    })}
                    shouldShowCancelButton={false}
                    confirmText={translate('common.ok')}
                />
            </View>
        </Modal>
    );
}

ConsoleModal.displayName = 'ConsoleModal';


export default withOnyx<ConsoleModalProps, ConsoleModalOnyxProps>({
    capturedLogs: {
        key: ONYXKEYS.LOGS,
    },
    shouldStoreLogs: {
        key: ONYXKEYS.SHOULD_STORE_LOGS,
    },
})(ConsoleModal);
