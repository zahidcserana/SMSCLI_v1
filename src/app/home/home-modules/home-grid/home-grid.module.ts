import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGridComponent } from './home-grid.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HomeGridComponent],
  exports: [HomeGridComponent]
})
export class HomeGridModule { }
