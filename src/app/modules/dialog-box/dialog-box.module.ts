import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxComponent } from './dialog-box.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[DialogBoxComponent],
  declarations: [DialogBoxComponent]
})
export class DialogBoxModule { 
  
}

