import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable()
export class RegisterCheckService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url = state.url;
        // console.log(url);
        if(url.includes('open')) {
            if(sessionStorage.getItem('regOpen') == 'OPEN') return true;
        } else if(url.includes('edit')) {
            if(sessionStorage.getItem('regEdit')) return true;
        } else if(url.includes('close')) {
            if(sessionStorage.getItem('regClose')) return true;
        }
        this.router.navigate(['admin/register']);
        return false;
    }



}
