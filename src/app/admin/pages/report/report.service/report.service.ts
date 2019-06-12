import {Injectable, Optional} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { ReportServiceConfig } from '../models/report-models';


@Injectable()
export class ReportService {

    config: ReportServiceConfig;

    constructor(
        @Optional() config: ReportServiceConfig,
        private http: HttpService
    ) {
        this.config = config;
    }

    formateListDate(d) {
        if(d) {
            return new Date(d);
        } 
        return '';
    }

    formateRentType(t) {
        switch (t.toUpperCase()) {
            case 'HOURLY':
                return 'Hour(s)';
            case 'DAILY':
                return 'Day(s)';
            case 'WEEKLY':
                return 'Week(s)';
        }
    }

    
    getTansactionList(p?,l?,f?) {
       return this.http.get(`payments?page_no=${p ? p : 1}&limit=${l ? l : 20}${f}`).pipe(map((res) => res.result));
    }

    getProductList(id) {
        return this.http.get(`orders/${id}`).pipe(map( res=> res.result));
    }

    getSalesReport(p?,l?,f?) {
        return this.http.get(`sales-report?page_no=${p ? p : 1}&limit=${l ? l : 20}${f}`).pipe(map((res) => res.result));
    }

    getOrderStatus() {
        return this.http.get('order/status').pipe(map( res=> res.result.data)); 
    }

    exportSales(data) {
        return this.http.getBlob(`sales-report/export${data}`);
    }

    getterminals() {
        return this.http.get(`locations`).pipe(map(res => res));
    }

}
