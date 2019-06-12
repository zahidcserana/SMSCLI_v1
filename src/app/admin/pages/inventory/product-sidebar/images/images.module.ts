import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { ImagesComponent } from './images.component';
import { ImagePopupModule } from '../../../../../modules/image-popup/image-popup.module';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { ImagePopupComponent } from '../../../../../modules/image-popup/image-popup.component';
import { DragDropModule } from '../../../../../modules/drag-drop/drag-drop.module';
import { ImageService } from './image.service';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: ImagesComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogBoxModule,
    ImagePopupModule,
    DragDropModule,
    FormsModule
  ], exports: [
    RouterModule
  ], declarations: [
    ImagesComponent
  ],
  entryComponents: [DialogBoxComponent, ImagePopupComponent],
  providers: [ImageService]
})
export class ImagesModule {
}