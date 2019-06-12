import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalCalenderComponent } from './rental-calender.component';
import { CalanderModule } from '../../../../modules/calander/calander.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {path: '', component: RentalCalenderComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CalanderModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  declarations: [RentalCalenderComponent]
})
export class RentalCalenderModule { }
