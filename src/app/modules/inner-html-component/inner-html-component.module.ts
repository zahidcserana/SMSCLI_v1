import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerHtmlComponentComponent } from './inner-html-component.component';
import { SafeHtmlModule } from '../safe-html/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [InnerHtmlComponentComponent],
  declarations: [InnerHtmlComponentComponent]
})
export class InnerHtmlComponentModule { }
