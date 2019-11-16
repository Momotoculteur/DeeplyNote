import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from '../settings/settings.component';
import { FileExplorerComponent } from '../projects/file-explorer/file-explorer.component';
import { FileEditorComponent } from '../projects/file-editor/file-editor.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    declarations: [SettingsComponent, FileExplorerComponent, FileEditorComponent],
    exports: [
        FileExplorerComponent,
        FileEditorComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FlexLayoutModule
    ]
})
export class SettingsModule { }
