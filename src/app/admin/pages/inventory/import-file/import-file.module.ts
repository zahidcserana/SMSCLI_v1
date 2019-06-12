import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportFileComponent } from './import-file.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DragDropModule } from '../../../../modules/drag-drop/drag-drop.module';


const routes: Routes = [
  {
    path: '',
    component: ImportFileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), LayoutModule,
    DragDropModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [ImportFileComponent]
})
export class ImportFileModule { }
