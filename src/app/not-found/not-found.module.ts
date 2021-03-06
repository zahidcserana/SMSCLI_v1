import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: NotFoundComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
