import { Component, OnInit } from '@angular/core';
import {custom, dark, light, Theme} from '../../shared/interface/Theme';
import {ThemeManagerService} from '../../shared/service/theme-manager.service';
import {TypeTheme} from '../../shared/enum/TypeTheme';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public availableTheme: Theme[];
    public aliasTypTheme = TypeTheme;
    public activeTheme: Theme;


    constructor(public themeManager: ThemeManagerService) {
        this.availableTheme = [
            light,
            dark,
            custom
        ];
        this.themeManager.activeThemeSubject.asObservable().subscribe( (newTheme: Theme) => {
            this.activeTheme = newTheme;
            console.log(newTheme)
        });
    }



    ngOnInit() {
    }

    public changeTheme(): void {
        this.themeManager.activeTheme = this.activeTheme;
        this.themeManager.setTheme();

    }

}
