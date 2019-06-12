import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { LayoutModule } from '../../layouts/layout.module';
import { ReportRoutingModule } from './report-routing.module';
import { ReportServiceModule } from './report.service/report-service.module';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReportRoutingModule,
    ReportServiceModule.forRoot()
  ],
  exports:[ReportRoutingModule],
  declarations: [ReportComponent]
})
export class ReportModule { }
