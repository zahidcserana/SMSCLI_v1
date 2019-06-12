import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute.component';
import {Routes, RouterModule} from '@angular/router';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { AttributeSetComponent } from './attribute-set/attribute-set.component';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { AttributeService } from './attribute.service';

const route: Routes = [
  {
    path: '',
    component: AttributeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule,
    PaginationModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [AttributeComponent, AttributeSetComponent, ViewComponent],
  providers: [AttributeService]
})
export class AttributeModule { }
