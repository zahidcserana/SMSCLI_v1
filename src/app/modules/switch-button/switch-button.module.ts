import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchButtonComponent } from './switch-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SwitchButtonComponent],
  declarations: [SwitchButtonComponent]
})
export class SwitchButtonModule { }
