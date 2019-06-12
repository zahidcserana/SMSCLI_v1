import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { ImagePopupModule } from '../../../../../modules/image-popup/image-popup.module';
import { ImagePopupComponent } from '../../../../../modules/image-popup/image-popup.component';

const route: Routes = [
  {
    path: '',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    ImagePopupModule
  ],
  declarations: [LayoutComponent, ThemeComponent],
  entryComponents: [ThemeComponent, ImagePopupComponent]
})
export class LayoutConentModule { }
