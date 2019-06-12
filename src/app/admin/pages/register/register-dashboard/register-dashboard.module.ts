import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDashboardComponent } from './register-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
const route: Routes = [
  { path: '', component: RegisterDashboardComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [RegisterDashboardComponent]
})
export class RegisterDashboardModule { }
