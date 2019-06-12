import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantsComponent } from './variants.component';
import { Select2AddOptionModule } from '../select2-add-option/select2.module';

@NgModule({
  imports: [
    CommonModule,
    Select2AddOptionModule
  ],
  exports: [VariantsComponent],
  declarations: [VariantsComponent]
})
export class VariantsModule { }
