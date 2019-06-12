import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { Routes, RouterModule } from '@angular/router';

const route:Routes= [
  {
    path:'',
    component:OverviewComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
