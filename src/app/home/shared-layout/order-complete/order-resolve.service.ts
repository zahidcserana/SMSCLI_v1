import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class OrderInfoResoveService implements Resolve<any> {
    constructor(private http: HttpService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get('orders/' + route.parent.params.id).pipe(map(res => {
            return res.result.data;
        }), catchError(() => {
            return of(null);
        }));

    }
}
