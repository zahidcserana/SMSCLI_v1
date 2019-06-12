import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivationComponent } from './activation.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: ActivationComponent}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  
  declarations: [ActivationComponent]
})
export class ActivationModule { }
