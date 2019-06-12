import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingsComponent } from './billings.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: BillingsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [BillingsComponent]
})
export class BillingsModule { }
