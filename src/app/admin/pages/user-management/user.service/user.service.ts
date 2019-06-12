import {Injectable, Optional} from '@angular/core';
import { map, debounceTime} from 'rxjs/operators';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { UserServiceConfig } from '../models/user.models';
import { FORMAT_SEARCH } from '../../../../globals/_classes/functions';

@Injectable()
export class UserService implements Resolve<any> {

    config: UserServiceConfig;

    private USER_Image = new BehaviorSubject<string>(null);
    user_image = this.USER_Image.asObservable();

    private USER_Status = new BehaviorSubject<any>(null);
    user_status = this.USER_Status.asObservable();

    changeImage(image:string) {
      this.USER_Image.next(image)
    }

    changeProfileStatus(st) {
        this.USER_Status.next(st)
      }

    constructor(@Optional() config: UserServiceConfig, private http: HttpService, 
    private router: Router) {
        this.config = config;
    }
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {

        return this.getUserList(1,10,'');
    }
    

    getUserList(page?,limit?,filter?){
        return this.http.get('users/index?pageNo='+page+'&limit='+limit+filter).pipe(map( res=> res.result));
    }

    proccessFilterParam(param){ 
        return FORMAT_SEARCH(param);
    }

    findUserType(type){
        switch(true){
          case type==1:
            return 'Supper Admin';
          case type==2:
            return 'Company Admin';
          case type==3:
            return 'Store Admin';
          case type==4:
           return 'Cash Register';
        }
      }
    
      checkStatus(state){
        if(state==1){
          return 'Active';
        }
    
        return 'Inactive';
      }

    register(data) {
        return this.http.post('stores/user', data).toPromise();
    }

    deleteUser(id){
        return this.http.delete(`users/${id}/delete`).toPromise();
    }

    getuserProfileInfo(id){
        return this.http.get(`users/${id}/account`).pipe(map((res)=> res.result));
    }

    updateUserInfo(id,data){
        return this.http.post(`users/${id}/account`,data).toPromise();
    }

    addUserAddress(data){
        return this.http.post(`users/address`,data).toPromise();
    }

    updateUserAddress(ad_id,data){
        return this.http.post(`users/address/${ad_id}`,data).toPromise();
    }

    deleteUserAddress(ad_id){
        return this.http.delete(`addresses/${ad_id}/delete`).toPromise();
    }


    getuserBasicInfo(id){
        return this.http.get(`users/${id}/info`).pipe(map((res)=> res.result));
    }

    getCardTotal(id){
        return this.http.get(`users/${id}/dashboard`).pipe(map((res)=> res.result));
    }

    resendPassword(data){
        return this.http.post('users/forgot-password', data).toPromise();
    }

    changePassword(user_id,data){
        return this.http.post(`users/change-password/${user_id}`,data).toPromise();
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

    

    
}
