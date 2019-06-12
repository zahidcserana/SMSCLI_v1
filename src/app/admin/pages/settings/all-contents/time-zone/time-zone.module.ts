import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeZoneComponent } from './time-zone.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const route: Routes =[
  {
    path: '',
    component: TimeZoneComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ],
  declarations: [TimeZoneComponent]
})
export class TimeZoneModule { }
