import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminService } from '../../admin.service';
import { PagesComponent } from '../pages.component';
import { UserManagementComponent } from './user-management.component';
import { UserService } from './user.service/user.service';
import { UserResolveService } from './user.service/user-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
        path: '',
        component: UserManagementComponent,
        canActivate: [AdminService],
        children:[
            {
                path: 'all',
                loadChildren: 'app/admin/pages/user-management/all-user/all-user.module#AllUserModule',
                resolve: { 'user_list':UserService}
            },
            {
                path: ':user_id',
                loadChildren: 'app/admin/pages/user-management/user-profile/user-profile.module#UserProfileModule',
            },
            {
                path: '**',
                redirectTo: 'all'
            },
        ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}