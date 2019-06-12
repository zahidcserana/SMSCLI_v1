import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxComponent } from './../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from './../../../../modules/dialog-box/dialog-box.module';
import { StoreListComponent } from './store-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';

const route: Routes = [
  {path: '', component: StoreListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    PaginationModule,
    DialogBoxModule
  ],
  entryComponents:[DialogBoxComponent],
  declarations: [StoreListComponent]
})
export class StoreListModule { }
