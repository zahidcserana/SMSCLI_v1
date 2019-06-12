import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingSettingsComponent } from './shipping-settings.component';
import { InstructionSectionComponent } from './main-form/instruction-section/instruction-section.component';
import { MainFormComponent } from './main-form/main-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { SwitchButtonModule } from '../../../../modules/switch-button/switch-button.module';
import { AddressModalModule } from './address-modal/address-modal.module';
import { AddressModalComponent } from './address-modal/address-modal.component';
import { UpsComponent } from './main-form/ups/ups.component';
import { UspsComponent } from './main-form/usps/usps.component';
import { FedexComponent } from './main-form/fedex/fedex.component';

const route: Routes =[
  {path: '', component: ShippingSettingsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogBoxModule,
    ReactiveFormsModule,
    SwitchButtonModule,
    AddressModalModule,
    RouterModule.forChild(route)
  ],
  entryComponents: [MainFormComponent, UspsComponent, FedexComponent, UpsComponent, DialogBoxComponent, AddressModalComponent],
  declarations: [ShippingSettingsComponent, MainFormComponent, InstructionSectionComponent, UpsComponent, UspsComponent, FedexComponent]
})
export class ShippingSettingsModule { }
