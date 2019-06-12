import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import { CompanyService } from './company.service';
import { CompanyComponent } from './company.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    canActivate: [CompanyService],
    children: [
      {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardkModule',
        canActivate: [CompanyService]
      },
      {
        path: 'store',
        loadChildren: './pages/manage-store/manage-store.module#ManageStoreModule',
        canActivate: [CompanyService]
      },
      {
        path: 'app',
        loadChildren: './pages/manage-app/manage-app.module#ManageAppModule',
        canActivate: [CompanyService]
      },
      {
        path: 'store-list',
        loadChildren: './pages/super-store-list/super-store-list.module#SuperStoreListModule',
        canActivate: [CompanyService]
      },
      {
        path: 'users',
        loadChildren: './pages/user-management/user-management.module#UserManagementModule',
        canActivate: [CompanyService]
      },
      {
        path: 'store-profile/:id',
        loadChildren: './pages/store-management/store-management.module#StoreManagementModule',
        canActivate: [CompanyService]
      },
      {
        path: 'profile/:id',
        loadChildren: './pages/user-profile/user-profile/user-profile.module#UserProfileModule',
        canActivate: [CompanyService]
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}