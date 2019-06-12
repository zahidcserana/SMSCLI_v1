import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GET_USER } from '../../../../globals/_classes/functions';

@Injectable()
export class ProfileGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userType = GET_USER().user_type_id;
    const allow = [1,2,3,4];
    if(allow.includes(userType)) {
      return true;
    }
    this.router.navigateByUrl(`partner/users/${route.parent.paramMap.get('user_id')}/account-settings`)
    return false;
    
  }

}