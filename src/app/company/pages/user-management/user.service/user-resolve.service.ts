import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { PartnerUserService } from './user.service';


@Injectable()
export class PartnerUserResolveService implements Resolve<any> {

    constructor(private service: PartnerUserService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path,router.parent.parent.parent.paramMap)
        switch (router.routeConfig.path) {
            case 'personal-info':
                return this.service.getuserProfileInfo(router.parent.parent.parent.params.user_id);
        }
    }
}