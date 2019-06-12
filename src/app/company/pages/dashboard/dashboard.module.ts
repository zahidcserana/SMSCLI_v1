import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import { PagesComponent } from '../pages.component';
import { DashboarServiceModule } from './dashboard.service/dashboard-service.module';
import { CompanyLayoutModule } from '../../layouts/company-layout.module';




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
    CommonModule, RouterModule.forChild(routes), CompanyLayoutModule, DashboarServiceModule.forRoot()
  ], exports: [
    RouterModule
  ], declarations: [
    DashboardComponent
  ]
})
export class DashboardkModule {
}