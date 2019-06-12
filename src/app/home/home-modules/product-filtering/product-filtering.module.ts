import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilteringComponent } from './product-filtering.component';
import { SelectedFilterItemComponent } from './selected-filter-item/selected-filter-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ProductFilteringComponent, SelectedFilterItemComponent],
  exports: [ProductFilteringComponent, SelectedFilterItemComponent]
})
export class ProductFilteringModule { }
