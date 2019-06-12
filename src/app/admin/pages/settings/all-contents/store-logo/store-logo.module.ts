import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLogoComponent } from './store-logo.component';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '../../../../../modules/drag-drop/drag-drop.module';

const route: Routes =[
  {
    path: '',
    component: StoreLogoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    DragDropModule
  ],
  declarations: [StoreLogoComponent]
})
export class StoreLogoModule { }
