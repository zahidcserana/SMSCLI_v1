import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllContentsComponent } from './all-contents.component';
import { AllContentsRoutingModule } from './all-contents-routing.module';



@NgModule({
  imports: [
    CommonModule,
    AllContentsRoutingModule
  ],
  declarations: [AllContentsComponent]
})
export class AllContentsModule { }
