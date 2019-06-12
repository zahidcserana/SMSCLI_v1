import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUserComponent } from './all-user.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { UserFilterComponent } from './user-filter/user-filter.component';

const route:Routes = [
  {
    path:'',
    component:AllUserComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    PaginationModule
  ],
  exports:[RouterModule],
  declarations: [AllUserComponent, UserFilterComponent]
})
export class AllUserModule { }
