import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursHolidayComponent } from './hours-holiday.component';
import { HoursComponent } from './hours/hours.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { AddFormComponent } from './holidays/add-form/add-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';

const route: Routes = [
  {path: '', component: HoursHolidayComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule
  ],
  entryComponents: [DialogBoxComponent],
  declarations: [HoursHolidayComponent, HoursComponent, HolidaysComponent, AddFormComponent]
})
export class HoursHolidayModule { }
