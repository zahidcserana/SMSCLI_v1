import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDashboardComponent } from './inventory-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
const route: Routes = [
  { path: '', component: InventoryDashboardComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [InventoryDashboardComponent]
})
export class InventoryDashboardModule { }
