import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminService } from '../../admin.service';
import { PagesComponent } from '../pages.component';
import { RegisterComponent } from './register.component';
import { RegisterResolveService } from './register.service/register-resolve.service';
import { AdminRoleGaurdService } from '../../admin-role-gaurd.service';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
        path: '',
        component: RegisterComponent,
        canActivate: [AdminService],
        children:[
          {
              path: '',
              loadChildren: './add-register/add-register.module#AddRegisterModule',
              resolve: {loc: RegisterResolveService}
          },
          {
            path: 'dashboard',
            loadChildren: './register-dashboard/register-dashboard.module#RegisterDashboardModule'
          },
          {
              path: 'reporting',
              loadChildren: './reporting/reporting.module#ReportingModule',
              canActivate: [AdminRoleGaurdService]
          }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}