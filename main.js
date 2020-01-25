"use strict";
exports.__esModule = true;
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, dialog = _a.dialog, ipcMain = _a.ipcMain;
var fs = require("fs");
var Store = require("electron-store");
var path = require("path");
var url = require("url");
var storage = new Store({ name: 'settings' });
var win;
var isToolsDev;
var args = process.argv.slice(1);
isToolsDev = args.some(function (val) { return val === '--devTools'; });
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (isToolsDev) ? true : false
        },
        frame: false,
        titleBarStyle: 'hidden',
        icon: './src/assets/icon/icon_transparent.png',
        show: false
    });
    initSettingsPreferences();
    if (isToolsDev) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron"),
            hardResetMethod: 'exit',
            argv: ['--devTools']
        });
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200/');
    }
    else {
        //win.webContents.openDevTools();
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/DeeplyNote/index.html'),
            protocol: 'file:',
            slashes: true
        }));
        //console.log(path.join(__dirname, 'dist/DeeplyNote/index.html'))
    }
    win.once('ready-to-show', function () {
        win.show();
    });
}
app.on('ready', createWindow);
ipcMain.on('pingOpenFolderDirectory', function (event, message) {
    var options = {
        title: 'Ouvrir un dossier',
        properties: ['openDirectory']
    };
    dialog.showOpenDialog(win, options).then(function (result) {
        if (!result.canceled) {
            var listFiles = fs.readdirSync(result.filePaths[0]);
            var filesList = listFiles.filter(function (elm) { return elm.match(/.*\.(txt)/ig); });
            var response = {
                path: result.filePaths[0],
                files: filesList
            };
            event.reply('responseOpenFolderDirectory', response);
        }
        else {
            console.log('Annulation par l utilisateur');
        }
    })["catch"](function (err) {
        console.log(err);
    });
});
ipcMain.on('pingDisplayFile', function (event, message) {
    var fileContent = fs.readFileSync(message, 'utf8');
    var lineNumber = fileContent.split('\n').length;
    var response = {
        file: fileContent,
        line: lineNumber
    };
    event.reply('responseFileContent', response);
});
ipcMain.on('saveFile', function (event, data) {
    fs.writeFileSync(data.file.path, data.content);
});
ipcMain.on('loadUserSettings', function (event, data) {
    event.reply('responseLoadUserSettings', storage.get('SETTINGS'));
});
ipcMain.on('saveSettings', function (event, data) {
    storage.set('SETTINGS.THEME_TYPE', data.type);
    storage.set('SETTINGS.CUSTO_PALETTE', data.props);
});
function initSettingsPreferences() {
    if (storage.get('SETTINGS')) {
    }
    else {
        storage.set({
            'SETTINGS': {
                'THEME_TYPE': 'DARK',
                'CUSTO_PALETTE': {
                    '--backgroungcolor-App': '#1e1e1e',
                    '--backgroundColor-MainBar': '#333333',
                    '--backgroundColor-ExplorerBar': '#333333',
                    '--textColor-Highlight': '#333333',
                    '--backgroundColor-LineContent': '#333333',
                    '--textColor-MainBar': '#c8c8c8',
                    '--textColor-Editor': '#333333'
                }
            }
        });
    }
}
