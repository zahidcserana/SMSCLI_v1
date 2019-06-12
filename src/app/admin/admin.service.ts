import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';
import { User_login } from './pages/user-management/models/user.models';
import { HttpService } from '../modules/http-with-injector/http.service';
import { Stores } from './pages/settings/models/settings.models';
import { isJson, dcrypt, dLogin } from '../globals/_classes/functions';

@Injectable()
export class AdminService
  implements CanLoad, CanActivate, CanActivateChild, Resolve<any> {
  private USER = new BehaviorSubject<User_login>(new User_login());
  user = this.USER.asObservable();

  private STORE = new BehaviorSubject<Stores[]>(null);
  stores = this.STORE.asObservable();

  changeUser(user) {
    this.USER.next(user);
  }

  changeStore(s) {
    this.STORE.next(s);
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpService
  ) {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.http
      .get(`clear-cache`)
      .toPromise()
      .then(res => {
        if (res.status === 'OK') {
          this.router.navigate(['/admin/dashboard']);
        }
      });
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (
      !(this.auth.authenticated && (this.auth.is_admin || this.auth.is_manager))
    ) {
      this.router.navigate(['/auth/login']).catch(err => {
        console.log(err);
      });
    }
    return this.auth.authenticated;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    localStorage.removeItem('online_store');
    if((state.url.includes('/admin/dashboard') || state.url.includes('/admin/newusertour')) && route.queryParamMap.get('user')) {
      const d = dcrypt(dcrypt(dcrypt(dLogin(route.queryParamMap.get('user')), 'upper'), 'lower'));
      const user = isJson(d) ? JSON.parse(d) : null;
      if(user) {
        this.setUserInfoForSuper(user);
      }
    }

    if (
      this.auth.authenticated && this.auth.storeUser
    ) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  private setUserInfoForSuper(value) {
    this.auth.setUser(value, true);

  }

}
