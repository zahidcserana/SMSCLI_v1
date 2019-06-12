import { Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserData} from './auth.module';
import { Observable } from 'rxjs';
import { encrypt, dcrypt } from '../../globals/_classes/functions';




@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.data.auth) {
            const token = this.getToken();
            if (this.authenticated && token) {
                return true;
            } else {
                this.router.navigate(['login']);
                return false;
            }
        }
        return true;
    }

    checkLogin(): Observable<boolean | any> {
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(this.authenticated);
            }, 1000);
        });
    }

    getToken(): string | boolean {
        const current_user = this.getUser();
        if (current_user) {
            const splitToken = current_user.token.split('.');
            const token = splitToken.map( (m, i) => {
                return (i+1)%2===0 ? dcrypt(m, 'upper') : dcrypt(m);
            }).join('.');
            return token.trim();
        }
        return false;
    }

    setUser(user, remember: boolean) {
        const splitToken = user.token.split('.');
        user.token = splitToken.map( (m, i) => {
            return (i+1)%2===0 ? encrypt(m, 'upper') : encrypt(m);
        }).join('.');
        user['expiry_time'] = new Date().getTime() + 43200000;
        const current_user =  JSON.stringify(user);
        if (remember) {
            localStorage.setItem('currentUser', current_user);
        } else {
            sessionStorage.setItem('currentUser', current_user);
        }
    }

    getUser(): UserData {
        return JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    }


    get userData(): UserData {
        return this.getUser();
    }

    get authenticated(): boolean {
        const user = this.getUser();
        let nowTime = new Date().getTime();
        if (user && user['expiry_time'] && (user['expiry_time'] > nowTime)) return true;
        return false;
    }

    get is_admin(): boolean {
        let user  = this.getUser();
        if (user) {
            if (user.user_type_id == 1) return true;
        }
        return false;
    }

    get is_patner(): boolean {
        let user  = this.getUser();
        if (user) {
            if (user.user_type_id == 2) return true;
        }
        return false;
    }

    get is_storeOwner(): boolean {
        let user  = this.getUser();
        if (user) {
            if (user.user_type_id == 3) return true;
        }
        return false;
    }

    get is_manager(): boolean {
        let user  = this.getUser();
        if (user) {
            if (user.user_type_id == 4) return true;
        }
        return false;
    }

    get is_customer(): boolean {
        let user  = this.getUser();
        if (user) {
            if (user.user_type_id == 5) return true;
        }
        return false;
    }

    get storeUser(): boolean {
        const user  = this.getUser();
        const type = [1,2,3,4];
        return (user && type.includes(user.user_type_id) && user.store_id) ? true : false;
    }

    get onlyAdminUser(): boolean {
        const user  = this.getUser();
        const type = [1,2,3];
        return (user && type.includes(user.user_type_id) && user.store_id) ? true : false;
    }


}
