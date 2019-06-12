import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailsComponent } from './store-details.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: StoreDetailsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [StoreDetailsComponent]
})
export class StoreDetailsModule { }
