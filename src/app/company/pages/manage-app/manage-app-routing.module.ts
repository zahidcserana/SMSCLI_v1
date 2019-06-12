import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PagesComponent } from '../pages.component';
import { CompanyAppResolveService } from './company-app.service/company-app-resolve.service';
import { ManageAppComponent } from './manage-app.component';





const routes: Routes = [
  { path: '',
    component: PagesComponent,
    children:[
        {
            path: '',
            component: ManageAppComponent,
            children: [
                {
                    path: 'list',
                    loadChildren: './app-list/app-list.module#AppListModule',
                },
                {
                    path: 'add',
                    loadChildren: './add-app/add-app.module#AddAppModule',
                    data: {edit: false}
                },
                {
                    path: 'edit/:appId',
                    loadChildren: './add-app/add-app.module#AddAppModule',
                    resolve: {appForm: CompanyAppResolveService}, data: {edit: true}
                },
                {
                    path: '',
                    redirectTo: 'list',
                    pathMatch: 'full'
                },
            ]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAppRoutingModule {}