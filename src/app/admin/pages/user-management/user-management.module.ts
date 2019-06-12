import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { LayoutModule } from '../../layouts/layout.module';
import { UserServiceModule } from './user.service/user-service.module';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    LayoutModule,
    UserServiceModule.forRoot()
  ],
  exports:[UserManagementRoutingModule],
  declarations: [UserManagementComponent],
  providers:[]
})
export class UserManagementModule { }
