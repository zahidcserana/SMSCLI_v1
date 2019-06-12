import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { OrderService } from './order.service';


@Injectable()
export class RefundCheckService implements CanActivate {

    constructor(private router: Router, private service: OrderService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url = state.url;
        const id = this.service.getId(route);
        // console.log(url);
        if(url.includes('refund')) {
            if(sessionStorage.getItem('pay')) return true;
        }
        this.router.navigate([`admin/reservations/${id}/details`]);
        return false;
    }



}
