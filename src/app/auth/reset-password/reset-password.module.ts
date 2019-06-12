import { PasswordStrengthBarModule } from './../../modules/password-strength-bar/password-strength-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule, Routes } from '@angular/router';


const route: Routes = [
  {path: '', component: ResetPasswordComponent}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordStrengthBarModule,
    RouterModule.forChild(route)
  ],
  
  declarations: [ResetPasswordComponent],

})
export class ResetPasswordModule { }
