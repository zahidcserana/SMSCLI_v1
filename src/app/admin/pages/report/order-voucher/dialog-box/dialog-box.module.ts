import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDialogBoxComponent } from './dialog-box.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports:[OrderDialogBoxComponent],
  declarations: [OrderDialogBoxComponent]
})
export class OrderDialogBoxModule { 
  
}

