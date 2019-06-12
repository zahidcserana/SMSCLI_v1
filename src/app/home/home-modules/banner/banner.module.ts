import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { Banner1Component } from './banner1/banner1.component';
import { Banner2Component } from './banner2/banner2.component';
import { RouterModule } from '@angular/router';
import { DefaultBannerComponent } from './default-banner/default-banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BannerComponent, Banner1Component, Banner2Component, DefaultBannerComponent],
  exports: [BannerComponent],
  providers: [],
  entryComponents: [Banner1Component, Banner2Component, DefaultBannerComponent]
})
export class BannerModule { }
