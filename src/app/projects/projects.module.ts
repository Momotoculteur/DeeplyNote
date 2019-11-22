import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SettingsModule} from '../settings/settings.module';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {SettingsComponent} from '../settings/settings.component';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {FileEditorComponent} from './file-editor/file-editor.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProjectsComponent, FileExplorerComponent, FileEditorComponent],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FlexLayoutModule,
        SettingsModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class ProjectsModule { }
