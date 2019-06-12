import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenComponent } from './open.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {path: '', component: OpenComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  declarations: [OpenComponent]
})
export class OpenModule { }
