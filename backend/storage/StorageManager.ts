import * as Store from 'electron-store';

export class StorageManager {
    private storage: Store;
    constructor() {
        this.storage = new Store({name:'settings'});
        this.initSettings();
    }

    public getAllSettings(): string {
        return this.storage.get('SETTINGS');
    }

    public setNewSettings(type: string, data: any): void {
        this.storage.set(type, data);
    }

    public initSettings(): void {
        if(this.storage.get('SETTINGS')) {
        } else {
            this.storage.set({
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

}