const { app, BrowserWindow } = require('electron')


let win;
let isToolsDev;
const args = process.argv.slice(1);
isToolsDev = args.some(val => val === '--devTools');


function createWindow () {
    let win = new BrowserWindow({
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
