import { NgModule } from '@angular/core';
import { NumberOnlyDirective } from './numberOnly.directive';
import { CreditNumberOnlyDirective } from './creditCardNumber.directive';


@NgModule({
  exports: [NumberOnlyDirective, CreditNumberOnlyDirective],
  declarations: [NumberOnlyDirective, CreditNumberOnlyDirective]
})
export class NumberOnlyDirectiveModule { }
