import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from '../settings/settings.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatRadioModule, MatToolbarModule} from '@angular/material';


@NgModule({
    declarations: [SettingsComponent],
    exports: [

    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatRadioModule
    ]
})
export class SettingsModule { }
