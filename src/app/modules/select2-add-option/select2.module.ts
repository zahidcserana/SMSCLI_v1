import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select2AddOptionComponent } from './select2.component';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@NgModule({
  imports: [
    CommonModule,
    DialogBoxModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [Select2AddOptionComponent],
  declarations: [Select2AddOptionComponent]
})
export class Select2AddOptionModule { }
