import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { RegisterService } from './register.service';




@Injectable()
export class RegisterResolveService implements Resolve<any> {

    constructor(private service: RegisterService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(router.routeConfig.path,this.service.getId(router))
        // const id = this.service.getId(router);
        switch (router.routeConfig.path) {
            case '':
                return this.service.getterminals();
            case 'open':
                return this.service.getDenomination();
            case 'close':
                return this.service.getDenomination();
        }
    }
}