import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { DeafultFooterComponent } from './deafult-footer/deafult-footer.component';
import { Footerlayout1Component } from './footerlayout1/footerlayout1.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [FooterComponent, DeafultFooterComponent, Footerlayout1Component],
  exports: [FooterComponent],
  entryComponents: [DeafultFooterComponent, Footerlayout1Component]
})
export class FooterModule { }
