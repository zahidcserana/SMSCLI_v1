import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PhoneNumberInputComponent } from "./phone-number-input.component";
import { FormsModule } from "@angular/forms";
import { PhoneNumberOnlyDirective } from "./phone-number-input.directive";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PhoneNumberInputComponent, PhoneNumberOnlyDirective],
  exports: [PhoneNumberInputComponent]
})
export class PhoneNumberInputModule {}
