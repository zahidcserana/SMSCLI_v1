import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../layouts/layout.module';
import {DashboardComponent} from './dashboard.component';
import { PagesComponent } from '../pages.component';
import { DashboarServiceModule } from './dashboard.service/dashboard-service.module';




const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      {path: '',
      component: DashboardComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule, DashboarServiceModule.forRoot()
  ], exports: [
    RouterModule
  ], declarations: [
    DashboardComponent
  ]
})
export class DashboardkModule {
}