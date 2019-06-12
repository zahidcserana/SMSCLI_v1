import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout1RoutingModule } from './layout1-routing.module';
import { Layout1Component } from './layout1.component';
import { HeaderModule } from '../home-modules/header/header.module';
import { FooterModule } from '../home-modules/footer/footer.module';


@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    Layout1RoutingModule,
  ],
  declarations: [Layout1Component],
  entryComponents: [],
  providers: []
})
export class Layout1Module { }
