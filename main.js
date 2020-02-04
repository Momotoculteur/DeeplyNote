"use strict";
exports.__esModule = true;
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require("path");
var url = require("url");
var electron_1 = require("electron");
var fs = require("fs");
var CommunicationManager_1 = require("backend/communication/CommunicationManager");
var win;
var isToolsDev;
var args = process.argv.slice(1);
isToolsDev = args.some(function (val) { return val === '--devTools'; });
var comMannager = new CommunicationManager_1.CommunicationManager();
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
        win.webContents.openDevTools();
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/DeeplyNote/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.once('ready-to-show', function () {
        win.show();
    });
}
app.on('ready', createWindow);
electron_1.ipcMain.on('pingOpenFolderDirectory', function (event, message) {
    var options = {
        title: 'Ouvrir un dossier',
        properties: ['openDirectory']
    };
    electron_1.dialog.showOpenDialog(win, options).then(function (result) {
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
