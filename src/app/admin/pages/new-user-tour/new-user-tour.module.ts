import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserTourComponent } from './new-user-tour.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { PagesComponent } from '../pages.component';
import { FormsModule } from '@angular/forms';


const route : Routes = [
  {path: '',
  component: PagesComponent,
  children:[
    {path: '',
    component: NewUserTourComponent}
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    LayoutModule,
    FormsModule
  ],
  declarations: [NewUserTourComponent]
})
export class NewUserTourModule { }
