import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { StoreService } from './store.service';




@Injectable()
export class StoreResolveService implements Resolve<any> {

    constructor(private service: StoreService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path, router.params.storeId);
        switch (router.routeConfig.path) {
            case 'edit/:storeId':
                const id = router.params.storeId;
                if(id) {
                    return this.service.viewStore(id);
                }
                break;
        }
    }

}