import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityComponent } from './availability.component';
import { Routes, RouterModule } from '@angular/router';
import { DialogBoxModule } from '../../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from '../../../../../modules/directive/directive.module';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';

const routes: Routes = [
  {
    path: '',
    component: AvailabilityComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogBoxModule,
    FormsModule,
    NumberOnlyDirectiveModule
  ],
  declarations: [AvailabilityComponent],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule]
})
export class AvailabilityModule { }
