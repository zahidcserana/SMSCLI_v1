import {Injectable, Optional} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { DashboardServiceConfig } from '../models/dashboar-models';



@Injectable()
export class DashboarService {

    config: DashboardServiceConfig;

    constructor(
        @Optional() config: DashboardServiceConfig,
        private http: HttpService
    ) {
        this.config = config;
    }


}
