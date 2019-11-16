import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from '../projects/projects.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SettingsModule} from '../settings/settings.module';


@NgModule({
  declarations: [ProjectsComponent],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        FlexLayoutModule,
        SettingsModule
    ]
})
export class ProjectsModule { }
