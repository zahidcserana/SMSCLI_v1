import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { ProductAttributeComponent } from './product-attribute.component';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { FormsModule } from '@angular/forms';
import { Select2AddOptionModule } from '../../../../../modules/select2-add-option/select2.module';


const routes: Routes = [
  {
    path: '',
    component: ProductAttributeComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DialogBoxModule,
    Select2AddOptionModule
  ], exports: [
    RouterModule
  ], declarations: [
    ProductAttributeComponent
  ],
  entryComponents:[DialogBoxComponent]
})
export class ProductAttributeModule {
}