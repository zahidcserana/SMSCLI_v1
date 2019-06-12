import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { getSubdomain } from '../../globals/_classes/functions';

@Injectable()



export class HomeResoveService implements Resolve<any> {
    constructor(private http: HttpService) {
    }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const subDom = getSubdomain();
        return this.http.get(`get-settings?store_name=${subDom.includes('localhost') ? 'golfy' : subDom}`).toPromise()
            .then(res => {
                if (res.status === 'OK') {
                    if (res.result.location && res.result.location.id && res.result.store.token) {
                        sessionStorage.setItem('online_store', JSON.stringify(res.result));
                        return res.result;
                    }
                }
                return null;
            }).catch(err => { console.log(err); return null; });

    }

}
