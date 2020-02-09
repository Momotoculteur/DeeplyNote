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

    it('Await/Asyn - Verifie qu une seule fenetre est ouverte', async () => {
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1);
    });

    it('Promesse - Verifie qu une seule fenetre est ouverte', () => {
        return app.client.getWindowCount()
            .then((windowCount) => {
                return assert.equal(windowCount, 1);
            })
    });

    it('Await/Asyn - Lire un champ de texte', async () => {
        const txtData = await app.client.getText('#appTitle')
        return assert.equal(txtData, 'BIENVENUE');
    });

    it('Await/Asyn - Lire un champ de texte', () => {
        return app.client.getText('#appTitle')
            .then((txtData) => {
                return assert.equal(txtData, 'BIENVENUE')
            });
    });

   it('Await/Asyn - Devtools fermé', async () => {
        const isOpen = await app.webContents.isDevToolsOpened();
        return assert.equal(isOpen, false);
    });

    it('Await/Asyn - Devtools fermé', () => {
        return app.webContents.isDevToolsOpened()
            .then((isOpen) => {
                return assert.equal(isOpen, false);
            });
    });

});

