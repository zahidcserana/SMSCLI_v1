import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsDashboardComponent } from './reservations-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
const route: Routes = [
  { path: '', component: ReservationsDashboardComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [ReservationsDashboardComponent]
})
export class ReservationsDashboardModule { }
