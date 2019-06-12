import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDashboardComponent } from './report-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
const route: Routes = [
  { path: '', component: ReportDashboardComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [ReportDashboardComponent]
})
export class ReportDashboardModule { }
