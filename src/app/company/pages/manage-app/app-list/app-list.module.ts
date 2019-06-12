import { DialogBoxComponent } from './../../../../modules/dialog-box/dialog-box.component';
import { PaginationModule } from './../../../../modules/pagination/pagination.module';
import { DialogBoxModule } from './../../../../modules/dialog-box/dialog-box.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppListComponent } from './app-list.component';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [
  {path: '', component: AppListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    PaginationModule,
    DialogBoxModule
  ],
  entryComponents:[DialogBoxComponent],
  declarations: [AppListComponent]
})
export class AppListModule { }
