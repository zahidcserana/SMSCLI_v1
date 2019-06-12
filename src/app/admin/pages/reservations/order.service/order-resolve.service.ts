import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { OrderService } from './order.service';


@Injectable()
export class OrderResolveService implements Resolve<any> {

    constructor(private service: OrderService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path,this.service.getId(router))
        const id = this.service.getId(router);
        switch (router.routeConfig.path) {
            case 'customer':
                if(id) {
                    return this.service.getOrderCustomer(id);
                }
                break;
            case 'product':
                if(id) {
                    return this.service.getProductList(id);
                }
                break;
            case 'refund':
                if(id) {
                    return this.service.getRefundList(id);
                }
                break;
            case 'delivery':
                if(id) {
                    return this.service.getDeliveryDetails(id);
                }
                break;
            case 'payment':
                if(id) {
                    return this.service.getPaymentList(id);
                }
                break;
        }
    }
}