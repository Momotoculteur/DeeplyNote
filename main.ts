const { app, BrowserWindow } = require('electron')
import * as path from 'path';
import * as url from 'url';
import { ipcMain, dialog, OpenDialogOptions } from 'electron';
import * as fs from 'fs';
import { CommunicationManager } from 'backend/communication/CommunicationManager';

let win;
let isToolsDev;
const args = process.argv.slice(1);
isToolsDev = args.some(val => val === '--devTools');

const comMannager = new CommunicationManager();


function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: (isToolsDev) ? true : false,
    },
    frame: false,
    titleBarStyle: 'hidden',
    icon: './src/assets/icon/icon_transparent.png',
    show: false
    });


    if (isToolsDev) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
            hardResetMethod: 'exit',
            argv: ['--devTools']
        });
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200/');
    } else {
        win.webContents.openDevTools();

        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/DeeplyNote/index.html'),
            protocol: 'file:',
            slashes: true
        }));

    }

    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow)

ipcMain.on('pingOpenFolderDirectory', (event, message) => {
    const options: OpenDialogOptions = {
        title: 'Ouvrir un dossier',
        properties: ['openDirectory'],
    };
    dialog.showOpenDialog(win, options
    ).then(result => {

        if(!result.canceled) {
            const listFiles = fs.readdirSync(result.filePaths[0]);
            let filesList = listFiles.filter( function( elm ) {return elm.match(/.*\.(txt)/ig);});
            const response = {
                path: result.filePaths[0],
                files: filesList
            };
            event.reply('responseOpenFolderDirectory', response);

        } else {
            console.log('Annulation par l utilisateur')
        }
    }).catch(err => {
        console.log(err);
    })
});