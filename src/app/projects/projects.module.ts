import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SettingsModule} from '../settings/settings.module';
import {MatButtonModule, MatListModule, MatToolbarModule} from '@angular/material';
import {SettingsComponent} from '../settings/settings.component';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {FileEditorComponent} from './file-editor/file-editor.component';


@NgModule({
  declarations: [ProjectsComponent, FileExplorerComponent, FileEditorComponent],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FlexLayoutModule,
        SettingsModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule
    ]
})
export class ProjectsModule { }
