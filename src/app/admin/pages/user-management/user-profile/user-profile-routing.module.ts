import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { UserResolveService } from '../user.service/user-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children:[
      {
        path:'account-settings',
        loadChildren:'app/admin/pages/user-management/user-profile/account-settings/account-settings.module#AccountSettingsModule'
      },
      {
        path:'profile',
        loadChildren:'app/admin/pages/user-management/user-profile/overview/overview.module#OverviewModule',
        resolve: { 'user_info':UserResolveService}
      },
      {
        path: '**',
        redirectTo: 'profile'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}