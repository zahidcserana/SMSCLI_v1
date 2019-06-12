import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveDialogBoxComponent } from './reserve-dialog-box.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports:[ReserveDialogBoxComponent],
  declarations: [ReserveDialogBoxComponent]
})
export class ReserveDialogBoxModule { 
  
}

