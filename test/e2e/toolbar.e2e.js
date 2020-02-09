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
    
    it('Await/Asyn - Plein ecran', async () => {
        await app.client.click('#maximizeApp');
        const isFull = await app.browserWindow.isMaximized();
        return assert.equal(isFull, true);
    });

    it('Promesse - Plein ecran', () => {
        return app.client.click('#maximizeApp')
            .then(() => {
                return app.browserWindow.isMaximized();
            })
            .then((isFull) => {
                return assert.equal(isFull, true);
            });
    });

    it('Await/Asyn - Réduire ecran', async () => {
        await app.client.click('#reduceApp');
        const isReduce = await app.browserWindow.isMinimized();
        return assert.equal(isReduce, true);
    });
    
    it('Promesse - Réduire ecran', () => {
        return app.client.click('#reduceApp')
            .then(() => {
                return app.browserWindow.isMinimized();
            })
            .then((isReduce) => {
                return assert.equal(isReduce, true);
            });
    });
    
});

