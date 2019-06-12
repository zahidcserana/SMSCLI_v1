import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProfileComponent } from './profile.component';
import { PartnerUserResolveService } from '../user.service/user-resolve.service';
import { ProfileGuardService } from './router-guard.service';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children:[
      {
        path:'details',
        loadChildren:'./user-details/user-details.module#UserDetailsModule',
        canActivate: [ProfileGuardService]
      },
      {
        path:'account-settings',
        loadChildren:'./account-settings/account-settings.module#AccountSettingsModule'
      },
      {
        path:'stores',
        loadChildren:'./stores/stores.module#StoresModule'
      },
      {
        path:'billings',
        loadChildren:'./billings/billings.module#BillingsModule'
      },
      {
        path: '**',
        redirectTo: 'details'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}