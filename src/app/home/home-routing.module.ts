import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'start'
    },
    {
        path: 'start',
        component: HomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
