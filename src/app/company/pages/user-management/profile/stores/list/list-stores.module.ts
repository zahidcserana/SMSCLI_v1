import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresListComponent } from './list-stores.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: StoresListComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [StoresListComponent]
})
export class StoresListModule { }
