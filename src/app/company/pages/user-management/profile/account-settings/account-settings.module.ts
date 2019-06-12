import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DragDropModule } from '../../../../../modules/drag-drop/drag-drop.module';
import { PasswordStrengthBarModule } from '../../../../../modules/password-strength-bar/password-strength-bar.module';
import { FormsModule } from '@angular/forms';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { PartnerUserResolveService } from '../../user.service/user-resolve.service';

const route:Routes= [
  {
    path: '',
    component: AccountSettingsComponent,
    children:[
      {
        path: 'personal-info',
        component: PersonalInfoComponent,
        resolve:{
          'user': PartnerUserResolveService
        }
      },
      {
        path: 'change-avatar',
        component: ChangeAvatarComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: '**',
        redirectTo:'personal-info'
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    DragDropModule,
    FormsModule,
    PasswordStrengthBarModule,
    DialogBoxModule
  ],
  entryComponents: [DialogBoxComponent],
  exports:[RouterModule],
  declarations: [
    AccountSettingsComponent, 
    PersonalInfoComponent, 
    ChangeAvatarComponent, 
    ChangePasswordComponent
  ]
})
export class AccountSettingsModule { }
