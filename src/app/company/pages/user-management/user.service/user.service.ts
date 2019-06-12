import {Injectable, Optional} from '@angular/core';
import { map, catchError} from 'rxjs/operators';
import {Router, Resolve } from '@angular/router';
import {Observable, BehaviorSubject, of } from 'rxjs';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { PartnerUserServiceConfig } from '../models/user.models';
import { FORMAT_SEARCH, GET_USER } from '../../../../globals/_classes/functions';

@Injectable()
export class PartnerUserService {

    config: PartnerUserServiceConfig;

    constructor(@Optional() config: PartnerUserServiceConfig, private http: HttpService) {
        this.config = config;
    }


    proccessFilterParam(param){ 
        return FORMAT_SEARCH(param);
    }

    findUserType(t){
        const type = typeof t === 'string' ? parseInt(t, 10) : t;
        switch(true){
          case type===1:
            return 'Super Admin';
          case type===2:
           return 'Company Admin';
          case type===3:
           return 'Store Admin';
          case type===4:
           return 'Store Manager';
          case type===5:
           return 'Customer';
        }
      }
    
      checkStatus(state){
        const type = typeof state === 'string' ? parseInt(state, 10) : state;
        switch(true){
          case type===0:
            return 'Pending';
          case type===1:
           return 'Active';
          case type===2:
           return 'Inactive';
          case type===3:
           return 'Delete';
        }
      }

    
    formateUser(user_info){
        for(let a of user_info.addresses){
          if(a.is_primary==1){
            user_info['phone'] = a.phone;
            user_info['mobile'] = a.mobile;
            break;
          }
        }

        return user_info;

    }

    formatPlanPeriod(user) {
        const type: string = user.account_type ? user.account_type : '';
        const plan = user.plan_period ? user.plan_period : '';

        if(type) {
            if(type.toLowerCase() === 'free') {
                return type;
            } else {
                if(plan) {
                    return type + '/' + plan;
                }
            }
        }

        return '';
    }

    // *************************************** API ********************************************

    getUserList(page?,limit?,filter?, sort?){
        return this.http.get('su-admin/users?page_no='+page+'&limit='+limit+filter+sort).pipe(map( res=> res.result), 
        catchError( er => of ({data: {users: [], total: 0, page_no: 1, limit: 20}})));
    }

    getuserProfileInfo(id){
        return this.http.get(`su-admin/users/${id}`).pipe(map((res)=> res.result), catchError( err => of(null)));
    }

    createUser(data) {
        return this.http.post(`su-admin/users/signup`,data).toPromise();
    }

    updateUserInfo(id,data){
        return this.http.post(`su-admin/users/update/${id}`,data).toPromise();
    }

    resendPassword(data){
        return this.http.post('users/forgot-password', data).toPromise();
    }

    changePassword(user_id,data){
        return this.http.post(`users/change-password/${user_id}`,data).toPromise();
    }

    storeCtreate(data) {
        return this.http.post(`su-admin/stores/create`,data).toPromise();
    }


    getStores(id) {
        return this.http.get(`su-admin/stores?user_id=${id}`).pipe(map( res => res));
    }

    getLoginInfoForStore(s_id) {
        return this.http.get(`su-admin/users/store-wise-token?user_id=${GET_USER().user_id}&store_id=${s_id}`).pipe(map( res => res));
    }

    changeUserStatus(data) {
        return this.http.post('su-admin/users/change-status', data).toPromise();
    }

    checkStore(data) {
        return this.http.post('stores/check-store', data).toPromise();
    }
    
}

