import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageStoreComponent } from './manage-store.component';
import { ManageStoreRoutingModule } from './manage-store-routing.module';
import { CompanyLayoutModule } from '../../layouts/company-layout.module';
import { StoreServiceModule } from './store.service/store-service.module';



@NgModule({
  imports: [
    CommonModule,
    ManageStoreRoutingModule,
    CompanyLayoutModule,
    StoreServiceModule
  ],
  declarations: [ManageStoreComponent]
})
export class ManageStoreModule { }
