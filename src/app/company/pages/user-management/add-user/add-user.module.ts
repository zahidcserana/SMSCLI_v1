import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from '../../../../modules/password-strength-bar/password-strength-bar.module';

const route:Routes = [
  {
    path:'',
    component:AddUserComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    PasswordStrengthBarModule
  ],
  declarations: [AddUserComponent]
})
export class AddUserModule { }
