import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionComponent } from './terms-condition.component';
import { RouterModule, Routes } from '@angular/router';
import { InnerHtmlComponentModule } from '../../../modules/inner-html-component/inner-html-component.module';

const route: Routes = [
  {
    path: '',
    component: TermsConditionComponent,

  }
];
@NgModule({
  imports: [
    CommonModule,
    InnerHtmlComponentModule,
    RouterModule.forChild(route),
  ],
  exports: [RouterModule],
  declarations: [TermsConditionComponent]
})
export class TermsConditionModule { }
