const assert = require('assert');
const path = require('path');
const Application = require('spectron').Application;
const electronPath = require('electron');



describe('Test Basic', function () {

    jest.setTimeout(10000)

    const app = new Application({
        path: electronPath,
        args: [path.join(__dirname, '../..')],
        startTimeout: 10000,
        waitTimeout: 10000
    });

    beforeEach(() => {
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
        return app.stop();
        }
    });

    it('Await/Asyn - Ouverture de lapplication sur le module HOME', async () => {
        const te = await app.webContents.getURL()
        const isHome = te.includes('home');
        return assert.equal(isHome, true);
    });

    it('Promesse - Ouverture de lapplication sur le module HOME', async () => {
        return app.webContents.getURL()
            .then((url) => {
                return url.includes('home');
            })
            .then((isHome) => {
                return assert.equal(isHome, true); 
            });
    });

});

