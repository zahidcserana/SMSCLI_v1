import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SchoolRoutingModule} from './school-routing.module';
import {SchoolComponent} from "./school.component";
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
      CommonModule,
      SchoolRoutingModule
  ],
  declarations: [SchoolComponent, HeaderComponent, FooterComponent, DashboardComponent, AboutComponent]
})
export class SchoolModule { }
