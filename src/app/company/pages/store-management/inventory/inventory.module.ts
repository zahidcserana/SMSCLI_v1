import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: InventoryComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [InventoryComponent]
})
export class InventoryModule { }
