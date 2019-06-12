import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileGuardService } from './router-guard.service';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    DialogBoxModule
  ],
  entryComponents: [DialogBoxComponent],
  exports:[ProfileRoutingModule],
  declarations: [ProfileComponent],
  providers: [ProfileGuardService]
})
export class ProfileModule { }
