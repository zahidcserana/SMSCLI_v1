import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './stores.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: StoresComponent, children: [
    {path: '', loadChildren: './list/list-stores.module#StoresListModule'},
    {path: 'add', loadChildren: './add/add.module#AddUserStoreModule'}
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [StoresComponent]
})
export class StoresModule { }
