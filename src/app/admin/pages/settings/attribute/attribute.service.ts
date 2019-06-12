import {Injectable} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../../modules/auth/auth.service';

declare let $: any;


@Injectable()
export class AttributeService {

    constructor(
        private authS: AuthService,
        private http: HttpService
    ) {}

    getAtrributeSet() {
        return this.http.get(`attribute_sets`).pipe(map(res => res.result));
    }



}
