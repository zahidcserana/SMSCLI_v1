import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingComponent } from './reporting.component';
import { DetialsComponent } from './detials/detials.component';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {path: '', component: ReportingComponent}
]

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  entryComponents: [DetialsComponent],
  declarations: [ReportingComponent, DetialsComponent, FilterComponent]
})
export class ReportingModule { }
