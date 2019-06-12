import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalanderComponent } from './calander.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CalanderComponent],
  exports: [CalanderComponent]
})
export class CalanderModule { }
