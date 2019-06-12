import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummernoteComponent } from './summernote.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SummernoteComponent],
  declarations: [SummernoteComponent]
})
export class SummernoteModule { }
