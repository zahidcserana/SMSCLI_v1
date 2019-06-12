import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutModule } from '../../layouts/layout.module';
import { SettingsServiceModule } from './setting-service/setting-service.module';
import { AddFormComponent } from './accounts/add-form/add-form.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutModule,
    SettingsServiceModule.forRoot()
  ],
  exports: [SettingsRoutingModule],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
