import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportComponent } from './sales-report.component';
import { FilterComponent } from './filter/filter.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    component: SalesReportComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    PaginationModule
  ],
  declarations: [SalesReportComponent, FilterComponent]
})
export class SalesReportModule { }
