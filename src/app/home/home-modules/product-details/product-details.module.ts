import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { DetailsLayout1Component } from './details-layout1/details-layout1.component';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '../../../modules/date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule
  ],
  declarations: [ProductDetailsComponent, DetailsLayout1Component],
  exports: [ProductDetailsComponent],
  entryComponents: [DetailsLayout1Component]
})
export class ProductDetailsModule { }
