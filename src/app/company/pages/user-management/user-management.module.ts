import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { PartnerUserServiceModule } from './user.service/user-service.module';
import { CompanyLayoutModule } from '../../layouts/company-layout.module';


@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    CompanyLayoutModule,
    PartnerUserServiceModule.forRoot()
  ],
  exports:[UserManagementRoutingModule],
  declarations: [UserManagementComponent],
  providers:[]
})
export class UserManagementModule { }
