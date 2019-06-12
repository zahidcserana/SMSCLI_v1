import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import 'rxjs/operator/toPromise';
import { map, debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../modules/auth/auth.service';
import {HttpService} from '../modules/http-with-injector/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class PreAuthService {
    constructor(private http: HttpService, private auth: AuthService,
                private router: Router) {
    }

    login(data: any, isStore: boolean): Observable<any> {
        if(isStore) {
            return this.http.post('users/login', data);
        }
        return this.http.post('su-admin/users/login', data);
    }

    setUser(value: any, reMe:boolean) {
        return this.auth.setUser(value,reMe);
    }

    getErrorMessage(err: HttpErrorResponse) {
        return this.http.getErrorMessage(err);
    }

    forgetPassword(data) {
        return this.http.post('users/forgot-password', data);
    }

    sendActivation(data) {
        return this.http.post('users/resend-activation-mail', {store_name: data}); 
    }

    sendActivationSMS(data) {
        return this.http.post('users/check-credentials', data); 
    }

    sendActivationBySMS(data) {
        return this.http.post('users/activate-with-sms', {activation_key: data}); 
    }

    authenticate(data) {
        return this.http.post('authenticate', data);
    }

    checkRole(role,url?,id?:number){
        switch (true){
            case  role===1:
                // let a = url || '/admin';
                this.router.navigate(['/admin']);  
                break;
            case role===3:
                let u = url || ('/user/'+id);
                this.router.navigate([u]);
                break;
        }
    }
    
    register(data) {
        return this.http.post('users/register', data).toPromise();
    }

    resetPassword(key,data) {
        return this.http.post('users/reset-password/'+ key, data);
    }

    resetPasswordActivation(key){
        return this.http.get('users/check-code/'+ key);
    }

    sendActivationCode(key, user) {
        if(user) return this.http.get('users/activate?activation_key='+ key + '&user=' + user);
        return this.http.get('stores/user/activate?activation_key='+ key );
    }

    checkStore(data) {
        return this.http.post('stores/check-store', data).toPromise();
    }
}
