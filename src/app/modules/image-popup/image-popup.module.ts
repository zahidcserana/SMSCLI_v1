import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePopupComponent } from './image-popup.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [ImagePopupComponent],
  exports:[
    ImagePopupComponent
  ]
})
export class ImagePopupModule { }
