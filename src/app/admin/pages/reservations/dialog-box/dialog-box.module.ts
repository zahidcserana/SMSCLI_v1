import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDialogBoxComponent } from './dialog-box.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports:[StatusDialogBoxComponent],
  declarations: [StatusDialogBoxComponent]
})
export class StatusDialogBoxModule { 
  
}

