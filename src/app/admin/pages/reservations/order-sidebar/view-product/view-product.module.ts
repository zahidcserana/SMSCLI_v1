import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './view-product.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
      path: '',
      component: ViewProductComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DialogBoxModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [ViewProductComponent]
})
export class ViewProductModule { }
