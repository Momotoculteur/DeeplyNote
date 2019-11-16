import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectsComponent} from './projects.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'start'
    },
    {
        path: 'start',
        component: ProjectsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
