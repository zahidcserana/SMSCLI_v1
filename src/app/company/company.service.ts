import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, BehaviorSubject} from 'rxjs';
import {AuthService} from '../modules/auth/auth.service';
import { User_login } from './pages/user-management/models/user.models';
import { GET_USER } from '../globals/_classes/functions';


@Injectable()
export class CompanyService implements CanActivate {

    changeUser: BehaviorSubject<User_login> = new BehaviorSubject(GET_USER());

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        localStorage.removeItem('online_store');
        if (this.auth.authenticated && (this.auth.is_admin || this.auth.is_patner)) {
            return true;
        };
        this.router.navigate(['/auth/partner-login']);
        return false;
    }


}
