import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { SortComponent } from './sort/sort.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { CategoryService } from './category.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';


const route:Routes=[
  {
    path:'',
    component:CategoriesComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule,
    RouterModule.forChild(route),
    DialogBoxModule
  ],
  exports:[RouterModule],
  declarations: [CategoriesComponent, SortComponent, CategoryFormComponent],
  providers: [CategoryService],
  entryComponents: [DialogBoxComponent]
})
export class CategoriesModule { }
