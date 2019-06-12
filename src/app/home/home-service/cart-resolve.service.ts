import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { getSubdomain } from '../../globals/_classes/functions';
import { of } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class CartResolveService implements Resolve<any> {

    constructor(
        private router: Router,
        private http: HttpService) { }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = router.params.token;
        return this.http.get('carts/' + token).toPromise().then(res => {
            if (res.status === 'OK') {
                return res.result.data;
            } else {
                this.navigate();
            }

        }).catch(err => {  this.navigate(); });
    }

    navigate() {
        this.router.navigate(['']);
    }
}
