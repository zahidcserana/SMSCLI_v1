import { Injectable } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { EndPoint } from '../../../../globals/endPoint/config';
import { map } from 'rxjs/operators';

declare let $:any;

@Injectable({
  providedIn: 'root'
})
export class CategoriesAttributeService {

  url = EndPoint + 'categories/all/';

    constructor(
        private authS: AuthService,
        private http: HttpService
    ) {}

    treeView () {
        $('#categoryAttr-jsTree').jstree({
            'core' : {
                'themes' : {
                    'responsive': false
                },
                'multiple': true,
                'check_callback' : false,
                'data' : {
                    'url' : node => {
                        console.log(this.url + node.id);
                        return this.url + node.id;
                    },
                    'headers': {Authorization: 'Bearer ' + this.authS.getToken()},
                    'type' : 'get',
                    'dataType': 'json'
                }
            },
            'types' : {
                'default' : {
                    'icon' : 'fa fa-folder'
                }
            },
            'checkbox': {
                three_state: false,
                cascade: 'undetermined'
            },
            'plugins': ['checkbox', 'types']
        });
    }

    refresh() {
      $('#categoryAttr-jsTree').jstree(true).refresh();
    }

    checkCate(id, data) {
      return data.findIndex(d => {
        return d.id == id;
      });
    }

    getAttributeList() {
      return this.http.get(`variants/list`).pipe(map(res => res.result));
    }

    getCategoryRoot() {
      return this.http.get(`categories/all`).pipe(map(res => res));
    }

    getCategoryAttributeList(id) {
      return this.http.get(`variant-sets-categories/view/${id}`).pipe(map(res => res.result));
    }

    saveCategoryAttr(data) {
        return this.http.post(`variant-sets-categories/add`, data).toPromise();
    }

    deleteCategoryAttr(data) {
        return this.http.post(`variant-sets-categories/delete`, data).toPromise();
    }
}
