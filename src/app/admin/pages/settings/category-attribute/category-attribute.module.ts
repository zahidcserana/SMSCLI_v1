import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAttributeComponent } from './category-attribute.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesAttributeService } from './categories-attribute.service';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';

const route:Routes=[
  {
    path:'',
    component:CategoryAttributeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    DialogBoxModule
  ],
  exports:[RouterModule],
  declarations: [CategoryAttributeComponent],
  providers: [CategoriesAttributeService],
  entryComponents: [DialogBoxComponent]
})
export class CategoryAttributeModule { }
