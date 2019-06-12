import { Injectable } from "@angular/core";
import { HttpService } from "../../../modules/http-with-injector/http.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";



@Injectable()
export class ProductWizardService {

    tagSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        allowSearchFilter: true,
        clearSearchFilter: true,
        enableCheckAll: false,
        itemsShowLimit: 2,
        maxHeight: 300
      };
    
    typeSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'category_name',
        allowSearchFilter: true,
        clearSearchFilter: true,
        enableCheckAll: false,
        itemsShowLimit: 2,
        maxHeight: 300
      };

    constructor(
        private http: HttpService
    ) {}

    getInitProduct(proName) {
        return {
            name: proName,
            quantity: '',
            tag: '',
            hourly_duration: '',
            hourly_price: '',
            daily_duration: '',
            daily_price: '',
            weekly_duration: '',
            weekly_price: '',
            price: ''
        }
    }

    // ***************** API *************************

    getAllType() {
        return this.http.get('setup/type').pipe( map( m => m.result.data), catchError( err => of([])));
    }

    getAllTag(params) {
       return this.http.get(`setup/get-category?type=${params}`).pipe( map( m => m.result.data), catchError( err => of([])));
    }

    getProductList(page, params) {
        return this.http.get(`setup/get-products?page_no=${page}&limit=50&quicklink_id=${params}`).pipe( map( m => m.result), catchError( err => of({data:[], total:0, page_no: 1})));
    }

    addProduct(data) {
       return this.http.post('setup/add-products', data).toPromise();
    }

}