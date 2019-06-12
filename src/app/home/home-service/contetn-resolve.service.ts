import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { getSubdomain, isJson } from '../../globals/_classes/functions';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ContentResoveService implements Resolve<any> {
    constructor(
        private sanitizer: DomSanitizer,
        private http: HttpService) {
    }
    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.http.get('contents').toPromise()
            .then(res => {
                // console.log(res);
                if (res.status === 'OK' && res.result.data.length > 0) {
                    const content = {};
                    const data = res.result.data.filter(f => {
                        return f['config'].status === 1;
                    });

                    for (const c of data) {
                        const tag = this.formatTag(c.config.tag);
                        content[tag] = isJson(c.contents) ? JSON.parse(c.contents) : c.contents;
                    }
                    localStorage.setItem('contents', JSON.stringify(content));
                    return content;
                } else {
                    return {};
                }
            }).catch(err => console.log(err));
    }

    formatTag(text: String) {
        return text.replace(/(\-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });

    }


    get contents() {
        const contents = new Object();
        const con = localStorage.getItem('contents') ? JSON.parse(localStorage.getItem('contents')) : null;
        return con;
    }
}
