import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { TagsComponent } from './tags.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { TagService } from './tag.setvice';

const route: Routes = [
  {
    path: '',
    component: TagsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule,
    PaginationModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [TagsComponent, AddTagComponent],
  providers: [TagService]
})
export class TagsModule { }
