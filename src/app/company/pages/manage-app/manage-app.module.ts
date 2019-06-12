import { ManageAppRoutingModule } from './manage-app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAppComponent } from './manage-app.component';
import { CompanyAppServiceModule } from './company-app.service/company-app-service.module';
import { CompanyLayoutModule } from '../../layouts/company-layout.module';

@NgModule({
  imports: [
    CommonModule,
    CompanyAppServiceModule,
    CompanyLayoutModule,
    ManageAppRoutingModule
  ],
  declarations: [ManageAppComponent]
})
export class ManageAppModule { }
