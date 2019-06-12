import { NgModule } from '@angular/core';
import { UnwrapTagDirective } from './unwrap-tag.directive';
import { HrefPreventDefaultDirective } from './href-prevent-default.directive';



@NgModule({
  exports:[HrefPreventDefaultDirective, UnwrapTagDirective],
  declarations: [HrefPreventDefaultDirective, UnwrapTagDirective]
})
export class HrefDirectiveModule { }