import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PagesComponent } from '../pages.component';
import { UserManagementComponent } from './user-management.component';
import { PartnerUserService } from './user.service/user.service';
import { PartnerUserResolveService } from './user.service/user-resolve.service';
import { CompanyService } from '../../company.service';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
        path: '',
        component: UserManagementComponent,
        canActivate: [CompanyService],
        children:[
          {
            path: '',
            loadChildren: './all-user/all-user.module#AllUserModule',
            pathMatch: 'full'
          },
          {
            path: 'add-user',
            loadChildren: './add-user/add-user.module#AddUserModule'
          },
          {
            path: ':user_id',
            loadChildren: './profile/profile.module#ProfileModule',
          }
        ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}