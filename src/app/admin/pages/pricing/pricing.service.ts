import { Injectable, Optional } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PricingService implements Resolve<any> {

    constructor(
        private http: HttpService) { }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const path = String(!router.url.length ? router.routeConfig.path : router.url[0].path);
        if (path === '') {
            return this.http.get('subscription/get-plans-by-name').toPromise().then(res => {
                if (res.status === 'OK') {
                    return res.result.data;
                }

            }).catch(err => { });
        } else if (path === 'paymentmethod') {
            return this.getCards();
        } else if (path === 'billing-history') {
            return this.getPaymentHistory();
        } else if (path === 'billing-invoice') {
            const id = router.params.id;
            return this.getSubsInvoice(id);
        }
    }

    getPlanId(plan_type, subsPlans) {
        if (subsPlans) {
            const obj = subsPlans.find(p => {
                if (p.type.toUpperCase() === plan_type.toUpperCase()) {
                    return true;
                }
            });
            return  { month: obj.month, year: obj.year };
        }
    }
    getCards() {
        return this.http.get('subscription/card-info').pipe(map(res => {
            return res.result.data ? res.result.data : [];
        }), catchError(err => {
            return of([]);
        }));

    }

    makePrimary(id) {
        return this.http.post('subscription/change-default-card', { card_id: id }).toPromise();
    }
    deleteCard(id) {
        return this.http.post('subscription/delete-card', { card_id: id }).toPromise();
    }
    getPaymentHistory() {
        return this.http.get('subscription/payment-history').pipe(map(res => {
            return res.result.data ? res.result.data : [];
        }), catchError(() => {
            return of([]);
        }));
    }

    getSubsInvoice(id) {
        return this.http.get('subscription/get-invoice/' + id).pipe(map(res => {
            return res.result.data;
        }), catchError(() => {
            return of(null);
        }));
    }
}
