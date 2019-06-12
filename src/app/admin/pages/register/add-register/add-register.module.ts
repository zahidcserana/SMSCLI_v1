import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRegisterComponent } from './add-register.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from '../../../../modules/pagination/pagination.module';
import { RegisterResolveService } from '../register.service/register-resolve.service';
import { RegisterCheckService } from '../register.service/register-check.service';

const route: Routes = [
  {path: '', component: AddRegisterComponent,
    children: [
      {path: 'open', loadChildren: './open/open.module#OpenModule', resolve: {denomination: RegisterResolveService}, canActivate: [RegisterCheckService]},
      {path: 'edit', loadChildren: './open/open.module#OpenModule', canActivate: [RegisterCheckService]},
      {path: 'close', loadChildren: './open/open.module#OpenModule', resolve: {denomination: RegisterResolveService}, canActivate: [RegisterCheckService]}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    RouterModule.forChild(route)
  ],
  declarations: [AddRegisterComponent]
})
export class AddRegisterModule { }
