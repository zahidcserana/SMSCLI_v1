import {Injectable} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { EndPoint } from '../../../../globals/endPoint/config';
import { AuthService } from '../../../../modules/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

declare let $: any;


@Injectable()
export class CategoryService {

    url = EndPoint + 'categories/all/';

    private CategoryId = new BehaviorSubject<string>(null);
    category_id = this.CategoryId.asObservable();
    changeId(id: string) {
        this.CategoryId.next(id);
    }

    constructor(
        private authS: AuthService,
        private http: HttpService
    ) {}

    treeView () {
        $('#category-jsTree').jstree({
            'core' : {
                'themes' : {
                    'responsive': false
                },
                'multiple': false,
                'check_callback' : false,
                'data' : {
                    'url' : node => {
                        return this.url + node.id;
                    },
                    'headers': {Authorization: 'Bearer ' + this.authS.getToken()},
                    'type' : 'get',
                    'dataType': 'json',
                    'success': function (data) {
                        return data;
                    }
                }
            },
            'types' : {
                'default' : {
                    'icon' : 'fa fa-folder'
                }
            },
            'plugins': ['types']
        });
    }

    sortingChildCategory(f, l, data) {
        const sorted_data: number[] = data.filter((id) => {
        return id !== f;
        });

        if (l) {
        sorted_data.splice(sorted_data.findIndex((id) => {
            return id === l;
        }), 0, f);
        } else {
        sorted_data.splice(sorted_data.length, 0, f);
        }

        return sorted_data;
    }

    getCatagory(id) {
        return this.http.get(`categories/${id}`).pipe(map (res => res.result));
    }

    addCatagory(data) {
        return this.http.post(`categories`, data).toPromise();
    }

    updateCatagory(id, data) {
        return this.http.post(`categories/${id}`, data).toPromise();
    }

    deleteCategory(id) {
        return this.http.delete(`categories/${id}`).toPromise();
    }

    getCategoryById(id) {
        return this.http.get(`categories/all/${id}`).pipe(map (res => res));
    }

    updateSorting(id, data) {
        return this.http.post(`categories/${id}/sort`, data).toPromise();
    }


}
