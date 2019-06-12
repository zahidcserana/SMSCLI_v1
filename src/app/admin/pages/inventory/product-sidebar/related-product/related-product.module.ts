import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RelatedProductComponent } from './related-product.component';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { Select2AJAXModule } from '../../../../../modules/select2-ajax/select2-ajax.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';


const routes: Routes = [
  {
    path: '',
    component: RelatedProductComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogBoxModule,
    Select2AJAXModule
  ], exports: [
    RouterModule
  ], declarations: [
    RelatedProductComponent
  ],
  entryComponents:[DialogBoxComponent]
})
export class RelatedProductModule {
}