import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { UserService } from './user.service';


@Injectable()
export class UserResolveService implements Resolve<any> {

    constructor(private service: UserService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path,router.parent.parent.parent.params.user_id)
        switch (router.routeConfig.path) {
            case 'profile':
                return this.service.getuserProfileInfo(router.parent.params.user_id);
            case 'personal-info':
                return this.service.getuserProfileInfo(router.parent.parent.parent.params.user_id);
        }
    }
}