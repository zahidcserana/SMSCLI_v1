import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { getSubdomain } from '../../globals/_classes/functions';
import { of, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
export interface GatewayConfig {
    offLoader: boolean;
}
@Injectable({
    providedIn: 'root'
})

export class PaymentGatewayResolveService implements Resolve<any> {
    private subject: GatewayConfig = { offLoader: false };
    gatewayConfig = new BehaviorSubject(this.subject);
    constructor(private http: HttpService) { }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get('payments/gateway').pipe(map(res => {
            const data =this.filterGateWay(res.result.data);
            localStorage['gateway-items'] = JSON.stringify(data);
            return data;
        }), catchError(() => {
            return of([]);
        })).pipe(startWith(JSON.parse(localStorage['gateway-items'] || '[]')));
    }
    
    filterGateWay(data) {
        return  data.filter( f => f.is_online)
    }
}

