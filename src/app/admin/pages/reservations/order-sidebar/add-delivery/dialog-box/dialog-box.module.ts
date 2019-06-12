import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningDialogBoxComponent } from './dialog-box.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[WarningDialogBoxComponent],
  declarations: [WarningDialogBoxComponent]
})
export class WarningDialogBoxModule { 
  
}

