import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMapComponent } from './angular-map.component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AngularMapComponent],
  exports: [AngularMapComponent],
})
export class AngularMapModule { }
