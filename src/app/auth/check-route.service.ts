import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable()
export class CheckRouteService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url = state.url;

        if(url.includes('/sms-activation')) {
            const email = sessionStorage.getItem('smsEmail');
            if(email) return true;

            this.router.navigate(['/auth/login']);
            return false;

        } else if(url.includes('/reset-password')) {
            const key = route.paramMap.get('key');
            if(key) return true;

            this.router.navigate(['/auth/forget-password']);
            return false;

        } else if (url.includes('/activation')) {
            const key = route.queryParamMap.get('activation_key');
            if(key) return true;

            this.router.navigate(['/auth/sign-up']);
            return false;
        }
    }



}
