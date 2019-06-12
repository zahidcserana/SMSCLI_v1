import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserStoreComponent } from './add.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {path: '', component: AddUserStoreComponent}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ],
  declarations: [AddUserStoreComponent]
})
export class AddUserStoreModule { }
