import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { PartnerUserProfileServiceModule } from '../user-profile.service/user-profile-service.module';
import { CompanyLayoutModule } from '../../../layouts/company-layout.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '../../../../modules/drag-drop/drag-drop.module';


@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CompanyLayoutModule,
    FormsModule,
    DragDropModule,
    PartnerUserProfileServiceModule.forRoot()
  ],
  exports:[UserProfileRoutingModule],
  declarations: [UserProfileComponent, PersonalInfoComponent, ChangeAvatarComponent, ChangePasswordComponent]
})
export class UserProfileModule { }
