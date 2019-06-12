import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { PricingComponent } from './pricing.component';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { NumberOnlyDirectiveModule } from '../../../../../modules/directive/directive.module';


const routes: Routes = [
  {
    path: '',
    component: PricingComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogBoxModule,
    FormsModule,
    NumberOnlyDirectiveModule
  ], exports: [
    RouterModule
  ], declarations: [
    PricingComponent
  ],
  entryComponents: [DialogBoxComponent]
})
export class PricingModule {
}