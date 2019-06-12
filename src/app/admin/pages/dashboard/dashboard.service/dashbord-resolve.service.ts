import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { DashboarService } from './dashboard.service';




@Injectable()
export class DashboardResolveService implements Resolve<any> {

    constructor(private service: DashboarService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path,this.service.getId(router))
        // const id = this.service.getId(router);
        switch (router.routeConfig.path) {
            // case 'customer':
            //     if(id) {
            //         return this.service.getOrderCustomer(id);
            //     }
            //     break;
        }
    }
}