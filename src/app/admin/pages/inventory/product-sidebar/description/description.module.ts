import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { DescriptionComponent } from './description.component';
import { FormsModule } from '@angular/forms';
import { Select2AddOptionModule } from '../../../../../modules/select2-add-option/select2.module';
import { VariantsModule } from '../../../../../modules/variants/variants.module';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { NumberOnlyDirectiveModule } from '../../../../../modules/directive/directive.module';


const routes: Routes = [
  {
    path: '',
    component: DescriptionComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Select2AddOptionModule,
    FormsModule,
    VariantsModule,
    NumberOnlyDirectiveModule,
    DialogBoxModule
  ], exports: [
    RouterModule
  ], declarations: [
    DescriptionComponent
  ],
  entryComponents: [DialogBoxComponent]
})
export class DescriptionModule {
}