import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewDialogBoxComponent } from './dialog-box.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SafeHtmlModule } from '../../../../../modules/safe-html/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SafeHtmlModule
  ],
  exports:[PreviewDialogBoxComponent],
  declarations: [PreviewDialogBoxComponent]
})
export class PreviewDialogBoxModule { 
  
}

