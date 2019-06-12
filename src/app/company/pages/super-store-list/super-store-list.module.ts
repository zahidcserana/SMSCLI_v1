import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperStoreListComponent } from './super-store-list.component';
import { StoreListService } from './store-list.service';
import { PagesComponent } from '../pages.component';
import { Routes, RouterModule } from '@angular/router';
import { CompanyLayoutModule } from '../../layouts/company-layout.module';
import { PaginationModule } from '../../../modules/pagination/pagination.module';
import { StoreFilterComponent } from './store-filter/store-filter.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '',
    component: PagesComponent,
    children:[
        {
            path: '',
            component: SuperStoreListComponent,
        }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    CompanyLayoutModule,
    PaginationModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SuperStoreListComponent, StoreFilterComponent],
  providers: [StoreListService]
})
export class SuperStoreListModule { }
