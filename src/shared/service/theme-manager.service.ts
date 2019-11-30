import { Injectable } from '@angular/core';
import {custom, dark, light, Theme} from '../interface/Theme';
import {ElectronService} from 'ngx-electron';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

    public activeTheme: Theme;
    public activeThemeSubject: BehaviorSubject<Theme>;

    constructor(public electronService: ElectronService) {
        this.activeTheme = dark;
        this.activeThemeSubject = new BehaviorSubject(light);
        this.initChannels();
        this.electronService.ipcRenderer.send('loadUserSettings');
    }

    public initChannels(): void {
        this.electronService.ipcRenderer.on('responseLoadUserSettings', (event, data) => {
            switch (data['THEME_TYPE']) {
                case 'DARK': {
                    this.activeTheme = dark;
                    break;
                }
                case 'LIGHT': {
                    this.activeTheme =  light;
                    break;
                }
                case 'CUSTOM': {
                    this.activeTheme = custom;
                    break;
                }
            }
            custom.props = data['CUSTO_PALETTE'];
            this.activeThemeSubject.next(this.activeTheme);
            this.setTheme();
        });
    }

    public setTheme(): void {

        Object.keys(this.activeTheme.props).forEach(property => {
            document.documentElement.style.setProperty(
                property,
                this.activeTheme.props[property]
            );
        });
    }
}
