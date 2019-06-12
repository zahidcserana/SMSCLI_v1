import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AlertModule} from './modules/alert/alert.module';
import {AuthModule} from './modules/auth/auth.module';
import {HttpWithInjectorModule} from './modules/http-with-injector/http-with-injector.module';
import { AdminService } from './admin/admin.service';
import { LogoutComponent } from './auth/logout/logout.component';
import { ScriptLoaderService } from './_services/script-loader.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { MetaService } from './_services/meta.service';
import { CompanyService } from './company/company.service';




@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    NgbModule.forRoot(),
    AlertModule.forRoot({main: 'something'}),
    HttpWithInjectorModule.forRoot({endPoint: ''})
  ],
  providers: [AdminService, ScriptLoaderService, MetaService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }