import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { ZoneSettingsComponent } from './zone-settings/zone-settings.component';
import { DistanceSettingsComponent } from './distance-settings/distance-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../../modules/directive/directive.module';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { SwitchButtonModule } from '../../../../modules/switch-button/switch-button.module';

const route: Routes = [
  {
    path: '',
    component: DeliveryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
    DialogBoxModule,
    SwitchButtonModule,
    NumberOnlyDirectiveModule
  ],
  entryComponents: [ZoneSettingsComponent, DistanceSettingsComponent, DialogBoxComponent],
  declarations: [DeliveryComponent, ZoneSettingsComponent, DistanceSettingsComponent]
})
export class DeliveryModule { }
