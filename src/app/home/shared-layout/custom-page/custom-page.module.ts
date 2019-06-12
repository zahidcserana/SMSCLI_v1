import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPageComponent } from './custom-page.component';
import { Routes, RouterModule } from '@angular/router';
import { InnerHtmlComponentModule } from '../../../modules/inner-html-component/inner-html-component.module';

const routes: Routes = [
  {
      path: '',
      component: CustomPageComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InnerHtmlComponentModule
  ],
  declarations: [CustomPageComponent]
})
export class CustomPageModule { }
