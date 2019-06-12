import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { EndPoint } from '../../../../../globals/endPoint/config';
import { AuthService } from '../../../../../modules/auth/auth.service';
import { HttpService } from '../../../../../modules/http-with-injector/http.service';
import { CategoryList } from '../product_models';


declare let $: any;


@Injectable()
export class ProductCategoryService {

    url = EndPoint + 'categories/all/';

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
                        // console.log(this.url + node.id);
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

    formatCategory(select, path) {
        const selectedCategory = new CategoryList();
         selectedCategory.category_id = parseInt(select[0]);
         selectedCategory.category_chain = path[0];
        return selectedCategory;
    }

    disableSave(data) {
        if(data) return true;
        return false;
    }

    saveCategory(id, data) {
        return this.http.post(`products/${id}/category/add`, data).toPromise();
    }

    deleteCategory(cate_id) {
        return this.http.delete(`products/category/${cate_id}`).toPromise();
    }



}
