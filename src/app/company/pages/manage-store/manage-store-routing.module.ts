import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ManageStoreComponent } from './manage-store.component';
import { PagesComponent } from '../pages.component';
import { StoreResolveService } from './store.service/store-resolve.service';




const routes: Routes = [
  { path: '',
    component: PagesComponent,
    children:[
        {
            path: '',
            component: ManageStoreComponent,
            children: [
                {
                    path: 'list',
                    loadChildren: './store-list/store-list.module#StoreListModule',
                },
                {
                    path: 'add',
                    loadChildren: './add-store/add-store.module#AddStoreModule',
                    data: {edit: false}
                },
                {
                    path: 'edit/:storeId',
                    loadChildren: './add-store/add-store.module#AddStoreModule',
                    resolve: {storeForm: StoreResolveService}, data: {edit: true}
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
export class ManageStoreRoutingModule {}