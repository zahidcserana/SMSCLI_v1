import {Injectable, Optional} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { RegisterServiceConfig } from '../models/register-models';
import { BehaviorSubject } from 'rxjs';
import { FORMAT_DATE, Format_Year_Month_date, GET_USER } from '../../../../globals/_classes/functions';



@Injectable()
export class RegisterService {

    config: RegisterServiceConfig;
    storeInfo = new BehaviorSubject(null);
    sideBarOff = new BehaviorSubject(null);

    constructor(
        @Optional() config: RegisterServiceConfig,
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

    formatStore(data, user) {
        let info = {
            user: user.name,
            store: '',
            terminal: ''
        }
        if(user.location_id) {
            const store = data.find((f) => f.id == user.location_id);
            info.store = store.name;
            if(user.terminal_id) {
                info.terminal = store.stores_terminals.find((d) => d.id == user.terminal_id).name;
            }
        }
        return info;
    }

    getTotal(data) {
        let sum = 0;
        for(let m of data) {
            if(m.id==10 || m.label.toLowerCase().includes('deleted')) {
                sum -= m.value;
            } else {
                sum += m.value;
            }
        }
        return sum;
    }

    getCurrentDateTime(d?) {
        const date = d ? d : new Date();
        return Format_Year_Month_date(date);
    }

    getCurrentDate(d?) {
        const date = d ? d : new Date();
        return FORMAT_DATE(date);
    }
    

    // ******************** API***********************

    getterminals() {
        return this.http.get(`locations`).pipe(map(res => res));
    }

    getLoctionList() {
        return this.http.get(`location-terminal-list`).pipe(map(res => res));
    }

    getDenomination() {
        return this.http.get(`denomination`).pipe(map(res => res.result.data));
    }

    getEditData(data) {
        return this.http.post(`register/get-data`, data).pipe(map(res => res.result));
    }

    submitRegister(data) {
        return this.http.post(`register/report/add`, data).toPromise();
    }

    getRegisterList(p?,l?,f?) {
        return this.http.get(`register/report/daily?page_no=${p ? p : 1}&limit=${l ? l : 20}${f}`).pipe(map((res) => res.result));
    }

    getRegisters(p?,l?) {
        const user = GET_USER();
        return this.http.get(`register/report?page_no=${p ? p : 1}&limit=${l ? l : 20}&store_id=${user.location_id}&terminal_id=${user.terminal_id}`).pipe(map((res) => res.result));
    }

    checkAssignee(id) {
        return this.http.get(`user-terminal/${id}`).pipe(map(res => res.result));
    }

    getDetails(data) {
        return this.http.post(`register_list`, data).pipe(map(res => res.result));
    }

    getSaleRefund(data) {
        return this.http.post(`sales/refund`, data).pipe(map(res => res.result));
    }

    exportRegister(data) {
        return this.http.getBlob(`register/export${data}`);
    }



}
