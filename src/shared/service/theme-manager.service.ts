import { Injectable } from '@angular/core';
import {dark, light, Theme} from '../interface/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

    public activeTheme: Theme;

    constructor() {
        this.activeTheme = light;
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
