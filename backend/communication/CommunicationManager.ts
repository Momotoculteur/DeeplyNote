import { ipcMain } from 'electron';
import { StorageManager } from 'backend/storage/StorageManager';
import * as fs from 'fs';

export class CommunicationManager {

    private storageManager: StorageManager;

    constructor() {
        this.storageManager = new StorageManager();
        ipcMain.on('loadUserSettings', (event, data) => {
            event.reply('responseLoadUserSettings', this.storageManager.getAllSettings());
        });
        ipcMain.on('saveSettings' , (event, data) => {
            this.storageManager.setNewSettings('SETTINGS.THEME_TYPE',data.type)
            this.storageManager.setNewSettings('SETTINGS.CUSTO_PALETTE',data.props)
        });

        ipcMain.on('pingDisplayFile', (event, message) => {
            const fileContent = fs.readFileSync(message, 'utf8');
            const lineNumber = fileContent.split('\n').length;
            const response = {
                file: fileContent,
                line: lineNumber
            };
            event.reply('responseFileContent', response);
        });
        
        ipcMain.on( 'saveFile', (event, data) => {
            fs.writeFileSync(data.file.path, data.content);
        });


    }

}