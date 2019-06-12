import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AdminService } from '../../admin.service';
import { PagesComponent } from '../pages.component';
import { ReportComponent } from './report.component';
import { AdminRoleGaurdService } from '../../admin-role-gaurd.service';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
        path: '',
        component: ReportComponent,
        canActivate: [AdminService],
        children: [
          {
            path: 'dashboard',
            loadChildren: 'app/admin/pages/report/report-dashboard/report-dashboard.module#ReportDashboardModule'
          },
            {
                path: 'order-voucher',
                loadChildren: 'app/admin/pages/report/order-voucher/order-voucher.module#OrderVoucherModule'
            },
            {
              path: 'sales-report',
              loadChildren: 'app/admin/pages/report/sales-report/sales-report.module#SalesReportModule',
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
export class ReportRoutingModule {}