import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: ForgetPasswordComponent}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  
  declarations: [ForgetPasswordComponent]
})
export class ForgetPasswordModule { }
