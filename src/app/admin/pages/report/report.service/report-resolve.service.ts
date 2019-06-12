import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { ReportService } from './report.service';



@Injectable()
export class ReportResolveService implements Resolve<any> {

    constructor(private service: ReportService) {
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