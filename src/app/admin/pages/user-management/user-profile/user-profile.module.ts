import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';


@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  exports:[UserProfileRoutingModule],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
