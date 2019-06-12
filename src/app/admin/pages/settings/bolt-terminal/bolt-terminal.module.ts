import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoltTerminalComponent } from './bolt-terminal.component';
import { Routes, RouterModule } from '@angular/router';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { DialogBoxModule } from '../../../../modules/dialog-box/dialog-box.module';
import { FormsModule } from '@angular/forms';
import { AddTerminalComponent } from './add-terminal/add-terminal.component';
import { ViewComponent } from './view/view.component';


const route: Routes = [
  {
    path: '',
    component: BoltTerminalComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    DialogBoxModule
  ],
  entryComponents: [DialogBoxComponent],
  exports: [RouterModule],
  declarations: [BoltTerminalComponent, AddTerminalComponent, ViewComponent]
})
export class BoltTerminalModule { }
