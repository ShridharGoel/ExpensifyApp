import React, {useState} from 'react';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import type {Log} from '@libs/Console';
import localFileCreateDownloadFolder from '@libs/localFileCreateDownloadFolder';
import BaseClientSideLoggingToolMenu from './BaseClientSideLoggingToolMenu';
import ConsoleModal from "@components/ClientSideLoggingToolMenu/ConsoleModal";

function ClientSideLoggingToolMenu() {
    const [file, setFile] = useState<{path: string; newFileName: string; size: number}>();

    const createAndSaveFile = (logs: Log[]) => {
        localFileCreateDownloadFolder('logs', JSON.stringify(logs, null, 2)).then((localFile) => {
            setFile(localFile);
        });
    };

    const shareLogs = () => {
        if (!file) {
            return;
        }
        Share.open({
            url: `file://${file.path}`,
        });
    };

    return (
        <BaseClientSideLoggingToolMenu
            file={file}
            onEnableLogging={() => setFile(undefined)}
            onDisableLogging={createAndSaveFile}
            onShareLogs={shareLogs}
        />
    );
}

ClientSideLoggingToolMenu.displayName = 'ClientSideLoggingToolMenu';

export default ClientSideLoggingToolMenu;
