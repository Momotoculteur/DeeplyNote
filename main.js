const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require('fs')
const Store = require('electron-store');
const path =  require('path');
const url = require('url');
const storage = new Store({name:'settings'});

let win;
let isToolsDev;
const args = process.argv.slice(1);
isToolsDev = args.some(val => val === '--devTools');


function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true
    },
    frame: false,
    titleBarStyle: 'hidden',
    icon: './src/assets/icon/icon_transparent.png',
    show: false
    });

    initSettingsPreferences();


    if (isToolsDev) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
            hardResetMethod: 'exit',
            argv: ['--devTools']
        });
        win.webContents.openDevTools();
        win.loadURL('http://localhost:4200/');
    } else {
        //win.webContents.openDevTools();

        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/DeeplyNote/index.html'),
            protocol: 'file:',
            slashes: true
        }));
        //console.log(path.join(__dirname, 'dist/DeeplyNote/index.html'))

    }


    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow)


ipcMain.on('pingOpenFolderDirectory', (event, message) => {
    const options = {
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

ipcMain.on('loadUserSettings', (event, data) => {
    event.reply('responseLoadUserSettings', storage.get('SETTINGS'));
});

ipcMain.on('saveSettings' , (event, data) => {
    storage.set('SETTINGS.THEME_TYPE', data.type);
    storage.set('SETTINGS.CUSTO_PALETTE', data.props);
});

function initSettingsPreferences()
{
    if(storage.get('SETTINGS')) {
    } else {
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
