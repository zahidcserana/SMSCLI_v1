import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { CompanyAppService } from './company-app.service';





@Injectable()
export class CompanyAppResolveService implements Resolve<any> {

    constructor(private service: CompanyAppService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path, router.params.storeId);
        switch (router.routeConfig.path) {
            case 'edit/:appId':
                const id = router.params.appId;
                if(id) {
                    return this.service.viewApp(id);
                }
                break;
        }
    }

}