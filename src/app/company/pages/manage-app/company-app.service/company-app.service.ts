import {Injectable, Optional} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { CompanyAppServiceConfig } from '../models/company-app.model';




@Injectable()
export class CompanyAppService {

    config: CompanyAppServiceConfig;

    constructor(
        @Optional() config: CompanyAppServiceConfig,
        private http: HttpService
    ) {
        this.config = config;
    }

    //  ********************** API ************************

    addEditApp(data, id?) {
        let promise: Promise<any>;
        if(id) {
            promise = this.editApp(data, id);
        } else {
            promise = this.addApp(data);
        }
        return promise;
    }

    addApp(data) {
        return this.http.post('apps', data).toPromise();
    }

    editApp(data, id) {
        return this.http.post(`apps/${id}`, data).toPromise();
    }

    getAllStore() {
        return this.http.get('stores/list');
    }

    getApps(p?, l?) {
        return this.http.get(`apps?page_no=${p ? p : 1}&limit=${l ? l : 20}`).pipe(map( res => res));
    }

    archiveApp(id) {
        return this.http.delete(`apps/${id}`).toPromise();
    }

    viewApp(id) {
        return this.http.get(`apps/${id}`).pipe(map( res => res));
    }

}
