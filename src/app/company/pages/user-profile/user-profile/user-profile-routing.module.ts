import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { PartnerUserProfileResolveService } from '../user-profile.service/user-profile-resolve.service';
import { PagesComponent } from '../../pages.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




const routes: Routes = [
  { path: '',
  component: PagesComponent,
  children: [{
      path: '',
      component: UserProfileComponent,
      children:[
        {
          path: 'personal-info',
          component: PersonalInfoComponent,
          resolve:{
            'user': PartnerUserProfileResolveService
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
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}