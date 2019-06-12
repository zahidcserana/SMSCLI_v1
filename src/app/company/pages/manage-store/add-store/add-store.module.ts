import { DragDropModule } from './../../../../modules/drag-drop/drag-drop.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStoreComponent } from './add-store.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



const route: Routes = [
  {path: '', component: AddStoreComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forChild(route)
  ],
  declarations: [AddStoreComponent]
})
export class AddStoreModule { }
