import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { GET_USER } from '../../../globals/_classes/functions';


@Injectable()
export class StoreListService {

    constructor(
        private http: HttpService
    ) {}


    getStores(p?, l?, filter?) {
        return this.http.get(`su-admin/stores?page_no=${p ? p : 1}&limit=${l ? l : 20}${filter}`).pipe(map( res => res));
    }

    getLoginInfoForStore(s_id) {
        return this.http.get(`su-admin/users/store-wise-token?user_id=${GET_USER().user_id}&store_id=${s_id}`).pipe(map( res => res));
    }


}
