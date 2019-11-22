const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const fs = require('fs')

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
    })

    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`),
        hardResetMethod: 'exit',
        argv: ['--devTools']
    });


    win.once('ready-to-show', () => {
        win.show();
    });


    win.loadURL('http://localhost:4200/');

    if (isToolsDev) {
        win.webContents.openDevTools();
    }
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
