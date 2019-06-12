import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUserComponent } from './all-user.component';
import { Routes, RouterModule } from '@angular/router';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PasswordStrengthBarModule } from '../../../../modules/password-strength-bar/password-strength-bar.module';

const route:Routes = [
  {
    path:'',
    component:AllUserComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    DialogBoxModule,
    FormsModule,
    RouterModule.forChild(route),
    PaginationModule,
    PasswordStrengthBarModule
  ],
  entryComponents: [DialogBoxComponent],
  exports:[RouterModule],
  declarations: [AllUserComponent, UserFilterComponent, AddUserComponent]
})
export class AllUserModule { }
