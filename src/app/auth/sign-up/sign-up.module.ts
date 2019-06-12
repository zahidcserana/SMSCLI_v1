import { PasswordStrengthBarModule } from './../../modules/password-strength-bar/password-strength-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { RouterModule, Routes } from '@angular/router';


const route: Routes = [
  {path: '', component: SignUpComponent}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordStrengthBarModule,
    RouterModule.forChild(route)
  ],
  
  declarations: [SignUpComponent],
})
export class SignUpModule { }
