import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { getSubdomain } from '../../globals/_classes/functions';
import { of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ShippingResolveService implements Resolve<any> {

    constructor(private http: HttpService) { }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get('stores/delivery-settings').toPromise().then(res => {
            if (res.status === 'OK') {
                return res.result;
            }
            return null;
        }).catch(err => { console.log(err); return null; });
    }
}
