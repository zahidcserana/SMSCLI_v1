import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { ProductCategoryService } from './category.service';


const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogBoxModule
  ], exports: [
    RouterModule
  ], declarations: [
    CategoriesComponent
  ],
  entryComponents: [DialogBoxComponent],
  providers: [ProductCategoryService]
})
export class CategoriesModule {
}