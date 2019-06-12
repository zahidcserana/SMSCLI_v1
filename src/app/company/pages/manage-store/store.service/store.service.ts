import {Injectable, Optional} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { StoreServiceConfig } from '../models/store.model';



@Injectable()
export class StoreService {

    config: StoreServiceConfig;

    constructor(
        @Optional() config: StoreServiceConfig,
        private http: HttpService
    ) {
        this.config = config;
    }

    checkLogo(logo: string): string {
        const index = logo.lastIndexOf('/');
        if(logo.charAt(index+1)) {
            return logo;
        }
        return null;
    }
    

    // *********************** Api*********************

    checkStore(data) {
        return this.http.post('stores/check-store', data);
    }

    addEditStore(data, id?) {
        let promise: Promise<any>;
        if(id) {
            promise = this.editStore(data, id);
        } else {
            promise = this.addStore(data);
        }
        return promise;
    }

    addStore(data) {
        return this.http.post('stores', data).toPromise();
    }

    editStore(data, id) {
        return this.http.post(`stores/${id}`, data).toPromise();
    }

    getStores(p?, l?) {
        return this.http.get(`stores?page_no=${p ? p : 1}&limit=${l ? l : 20}`).pipe(map( res => res));
    }

    archiveStore(id) {
        return this.http.delete(`stores/${id}`).toPromise();
    }

    viewStore(id) {
        return this.http.get(`stores/${id}`).pipe(map( res => res));
    }


}
