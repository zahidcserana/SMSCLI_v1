import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { RouterModule, Routes } from '@angular/router';
import { SummernoteModule } from '../../../../../modules/summernote/summernote.module';
import { PreviewDialogBoxModule } from '../dialog-box/dialog-box.module';
import { PreviewDialogBoxComponent } from '../dialog-box/dialog-box.component';


const route: Routes = [
  {path: '', component: PdfComponent}
]

@NgModule({
  imports: [
    CommonModule,
    SummernoteModule,
    RouterModule.forChild(route),
    PreviewDialogBoxModule
  ],
  entryComponents: [PreviewDialogBoxComponent],
  declarations: [PdfComponent]
})
export class PdfModule { }
