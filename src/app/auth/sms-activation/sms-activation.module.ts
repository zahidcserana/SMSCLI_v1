import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsActivationComponent } from './sms-activation.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PhoneNumberInputModule } from '../../modules/phone-number-input/phone-number-input.module';
// import { InternationalPhoneModule } from 'ng4-intl-phone';


const route: Routes = [
  {path: '', component: SmsActivationComponent}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    PhoneNumberInputModule
    // InternationalPhoneModule
  ],
  declarations: [SmsActivationComponent,]
})
export class SmsActivationModule { }
