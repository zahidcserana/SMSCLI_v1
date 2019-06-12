import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSettingsComponent } from './menu-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DragulaModule } from 'ng2-dragula';

const route: Routes = [
  {
    path: '',
    component: MenuSettingsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule,
    DragulaModule
  ],
  declarations: [MenuSettingsComponent, MenuFormComponent],
  entryComponents: [MenuFormComponent, DialogBoxComponent]
})
export class MenuSettingsModule { }
