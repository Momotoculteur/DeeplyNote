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

    public availableTheme: TypeTheme[];
    public curTheme: Theme = light;

    constructor(public themeManager: ThemeManagerService) {
        this.availableTheme = [
            TypeTheme.DARK,
            TypeTheme.LIGHT,
            TypeTheme.CUSTOM
        ];
    }

    ngOnInit() {
    }

}
