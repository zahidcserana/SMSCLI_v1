import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAppComponent } from './add-app.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  {path: '', component: AddAppComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ],
  declarations: [AddAppComponent]
})
export class AddAppModule { }
