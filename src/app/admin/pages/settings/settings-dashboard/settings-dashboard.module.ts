import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsDashboardComponent } from './settings-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
const route: Routes = [
  { path: '', component: SettingsDashboardComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [SettingsDashboardComponent]
})
export class SettingsDashboardModule { }
