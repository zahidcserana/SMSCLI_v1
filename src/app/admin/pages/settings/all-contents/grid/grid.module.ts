import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '../../../../../modules/drag-drop/drag-drop.module';
import { Select2NormalModule } from '../../../../../modules/select2-normal/select2-normal.module';
import { Select2AJAXModule } from '../../../../../modules/select2-ajax/select2-ajax.module';

const route: Routes = [
  {
    path: '',
    component: GridComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    Select2NormalModule,
    Select2AJAXModule,
    RouterModule.forChild(route)
  ],
  declarations: [GridComponent]
})
export class GridModule { }
