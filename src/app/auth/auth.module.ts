import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { PreAuthService } from './pre-auth.service';
import { CheckRouteService } from './check-route.service';




@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  
  declarations: [AuthComponent],
  providers: [PreAuthService, CheckRouteService]
})
export class AuthModule { }
