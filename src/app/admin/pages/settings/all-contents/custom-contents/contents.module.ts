import { DragDropModule } from '../../../../../modules/drag-drop/drag-drop.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentsComponent } from './contents.component';
import { Routes, RouterModule } from '@angular/router';
import { ContentsFormComponent } from './contents-form/contents-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { TextTypeComponent } from './text-type/text-type.component';
import { LinkTypeComponent } from './link-type/link-type.component';
import { ContentService } from '../../setting-service/contents.service';
import { TextAreaTypeComponent } from './textarea-type/textarea-type.component';

const routes: Routes = [
  { path: '', component: ContentsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    DialogBoxModule
  ],
  declarations: [ContentsComponent, ContentsFormComponent, TextTypeComponent, LinkTypeComponent, TextAreaTypeComponent],
  entryComponents: [DialogBoxComponent]
})
export class ContentsModule { }
