import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressModalComponent } from './address-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddressModalComponent],
  declarations: [AddressModalComponent]
})
export class AddressModalModule { }
