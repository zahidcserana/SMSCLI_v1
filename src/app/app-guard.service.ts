import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getSubdomain } from './globals/_classes/functions';

@Injectable({
  providedIn: 'root'
})
export class AppGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const subDom = getSubdomain();
    const forLogin = ['sms', 'client', 'partner'];
    if(subDom.includes('localhost')) {
      return true;
    } else {
      if (forLogin.includes(subDom)) {
        if(subDom == 'partner') {
          this.router.navigate(['/auth/partner-login']);
        } else {
          this.router.navigate(['/auth/login']);
        }
        return false;
      } else {
        return true;
      }
    }

    
  }

}
