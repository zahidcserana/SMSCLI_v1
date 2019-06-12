import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteSpecificComponent } from './site-specific.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes =[
  {
    path: '',
    component: SiteSpecificComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ],
  declarations: [SiteSpecificComponent]
})
export class SiteSpecificModule { }
