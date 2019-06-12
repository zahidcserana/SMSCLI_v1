import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMapModule } from '../../../modules/angular-map/angular-map.module';
import { NumberOnlyDirectiveModule } from '../../../modules/directive/directive.module';
const routes: Routes = [
  {
      path: '',
      component: ContactComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AngularMapModule,
    NumberOnlyDirectiveModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
