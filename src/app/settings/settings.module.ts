import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from '../settings/settings.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatRadioModule, MatToolbarModule, MatFormFieldModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MccColorPickerModule } from 'material-community-components';


@NgModule({
    declarations: [SettingsComponent],
    exports: [

    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatRadioModule,
        FormsModule,
        MccColorPickerModule
    ]
})
export class SettingsModule { }
