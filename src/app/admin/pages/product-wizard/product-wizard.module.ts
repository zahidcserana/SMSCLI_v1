import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductWizardComponent } from './product-wizard.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { PagesComponent } from '../pages.component';
import { ProductWizardService } from './product-wizard.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../modules/directive/directive.module';

const route : Routes = [
  {path: '',
  component: PagesComponent,
  children:[
    {path: '',
    component: ProductWizardComponent}
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    LayoutModule,
    FormsModule,
    NumberOnlyDirectiveModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [ProductWizardComponent],
  providers: [ProductWizardService]
})
export class ProductWizardModule { }
