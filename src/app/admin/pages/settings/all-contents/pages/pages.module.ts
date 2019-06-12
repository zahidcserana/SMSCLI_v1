import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';

const route: Routes =[
  {
    path: '',
    component: PagesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ],
  declarations: [PagesComponent, ContactUsComponent, AboutUsComponent, AddFormComponent],
  entryComponents: [ContactUsComponent, AboutUsComponent, AddFormComponent]
})
export class PagesModule { }
