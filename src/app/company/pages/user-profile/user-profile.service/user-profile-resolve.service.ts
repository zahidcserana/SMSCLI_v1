import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { PartnerUserProfileService } from './user-profile.service';



@Injectable()
export class PartnerUserProfileResolveService implements Resolve<any> {

    constructor(private service: PartnerUserProfileService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path, router.parent.parent.parent.paramMap.get('id'))
        switch (router.routeConfig.path) {
            case 'personal-info':
                return this.service.getuserProfileInfo(router.parent.parent.parent.paramMap.get('id'));
        }
    }
}