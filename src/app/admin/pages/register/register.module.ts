import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { LayoutModule } from '../../layouts/layout.module';
import { RegisterServiceModule } from './register.service/register-service.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RegisterRoutingModule,
    RegisterServiceModule.forRoot()
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
