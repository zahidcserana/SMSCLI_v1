import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PromotionModule } from '../../../home-modules/promotion/promotion.module';
import { FeaturedProductsModule } from '../../../home-modules/featured-products/featured-products.module';
import { BannerModule } from '../../../home-modules/banner/banner.module';
import { HomeGridModule } from '../../../home-modules/home-grid/home-grid.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BannerModule,
    PromotionModule,
    FeaturedProductsModule,
    HomeGridModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
