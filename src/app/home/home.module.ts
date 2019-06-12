import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as $ from 'jquery';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: []
})
export class HomeModule {

}
