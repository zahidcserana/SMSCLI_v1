import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InitLoginComponent } from './init-login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

const route: Routes = [
  {path: '', component: InitLoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    RouterModule.forChild(route)
  ],
  declarations: [InitLoginComponent]
})
export class InitLoginModule { }
