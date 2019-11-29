import { Component } from '@angular/core';
import {ThemeManagerService} from '../shared/service/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public themeManager: ThemeManagerService) {

    }
}
