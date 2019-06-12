import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../../layouts/layout.module';
import {AddProductComponent} from './add-product.component';
import { FormsModule } from '@angular/forms';
import { Select2AddOptionModule } from '../../../../modules/select2-add-option/select2.module';
import { VariantsModule } from '../../../../modules/variants/variants.module';
import { NumberOnlyDirectiveModule } from '../../../../modules/directive/directive.module';


const routes: Routes = [
  {
    path: '',
    component: AddProductComponent,
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule, Select2AddOptionModule,
    FormsModule,
    VariantsModule,
    NumberOnlyDirectiveModule
  ], 
  exports: [
    RouterModule,
  ], declarations: [
    AddProductComponent,
  ],
})
export class AddProductModule {
}