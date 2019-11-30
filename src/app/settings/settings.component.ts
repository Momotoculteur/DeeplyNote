import { Component, OnInit } from '@angular/core';
import {custom, dark, light, Theme} from '../../shared/interface/Theme';
import {ThemeManagerService} from '../../shared/service/theme-manager.service';
import {TypeTheme} from '../../shared/enum/TypeTheme';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public availableTheme: Theme[];
    public aliasTypTheme = TypeTheme;
    public activeTheme: Theme;


    constructor(public themeManager: ThemeManagerService,
                public electronService: ElectronService) {
        this.availableTheme = [
            light,
            dark,
            custom
        ];
        this.themeManager.activeThemeSubject.asObservable().subscribe( (newTheme: Theme) => {
            this.activeTheme = newTheme;
        });
    }



    ngOnInit() {
    }

    public changeTheme(): void {
        this.themeManager.activeTheme = this.activeTheme;
        this.themeManager.setTheme();
        this.electronService.ipcRenderer.send('saveSettings', this.activeTheme);
    }

    public updateCustomProperty(updatedProperty): void {
        Object.keys(this.activeTheme.props).forEach( (val) => {
            if (val === updatedProperty.key) {
                this.activeTheme.props[val] = updatedProperty.value;
            }
        });
        this.changeTheme();
    }

}
