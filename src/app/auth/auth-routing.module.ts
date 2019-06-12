import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import { CheckRouteService } from './check-route.service';


const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                loadChildren: './init-login/init-login.module#InitLoginModule'
                // data: {preloadDashboard: 'store'}
            },
            {
                path: 'partner-login',
                loadChildren: './login/login.module#LoginModule'
                // data: {preloadDashboard: 'company'}
            },
            {
                path: 'sign-up',
                loadChildren: './sign-up/sign-up.module#SignUpModule'
            },
            {
                path: 'activation',
                loadChildren: './activation/activation.module#ActivationModule',
                canActivate: [CheckRouteService]
            },
            {
                path: 'sms-activation',
                loadChildren: './sms-activation/sms-activation.module#SmsActivationModule',
                canActivate: [CheckRouteService]
            },
            {
                path: 'forgot-password',
                loadChildren: './forget-password/forget-password.module#ForgetPasswordModule'
            },
            {
                path: 'reset-password/:key',
                loadChildren: './reset-password/reset-password.module#ResetPasswordModule',
                canActivate: [CheckRouteService]
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
