import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminService } from './admin/admin.service';
import { HomeResoveService } from './home/home-service/home-resolve.service';
import { LogoutComponent } from './auth/logout/logout.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AppGuardService } from './app-guard.service';

const routes: Routes = [
    { path: 'logout', component: LogoutComponent },
    {
        path: '',
        loadChildren: 'app/home/home.module#HomeModule',
        resolve: {
            settings: HomeResoveService
        },
        canActivate: [AppGuardService]
    },
    {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule'
    },
    {
        path: 'not-found',
        loadChildren: 'app/not-found/not-found.module#NotFoundModule'
    },
    {
        path: 'partner',
        loadChildren: 'app/company/company.module#CompanyModule',
        data: { preload: true, module: 'company' }
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        data: { preload: true, module: 'store' }
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategyService})],
    exports: [RouterModule],
    providers: [HomeResoveService]
})
export class AppRoutingModule { }
