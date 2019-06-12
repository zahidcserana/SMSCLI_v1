import { Injectable, Optional } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { InventoryServiceConfig } from '../product-models/inventory.models';
import { Location } from '@angular/common';

import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError, of } from 'rxjs';
import { FormatPrice, FormateAttribute, GET_USER } from '../../../../globals/_classes/functions';

declare let $: any;

export class Reload {
    reload?: boolean;
    id?: number;
    from?: string;
    data?: any;
}


@Injectable()
export class InventoryService {

    config: InventoryServiceConfig;
    private subject = new BehaviorSubject<any>(new Reload());
    reloadDetails = this.subject.asObservable();
    reload(load: Reload) {
        this.subject.next(load);
    }

    private subjectRese = new BehaviorSubject<any>(null);
    reserve = this.subjectRese.asObservable();
    reserveReload(load) {
        this.subjectRese.next(load);
    }

    constructor(@Optional() config: InventoryServiceConfig,
        private http: HttpService,
        private location: Location,
        private router: Router) {
        this.config = config;
    }

    getAllProduct(p, l, query?) {
        const params = query ? query : '';
        const loc = GET_USER().location_id;
        return this.http.get(`students?location=${loc ? loc : ''}&page_no=${p ? p : 1}&limit=${l?l:20}${params}`).pipe(map(res => res));
    }

    getSupplier() {
        return this.http.get('classes').pipe(map(res => res.result));
    }

    getClasses() {
        return this.http.get('classes').pipe(map(res => res.result));
    }

    addProduct(data) {
        return this.http.post('students', data).toPromise();
    }

    getProductDescription(product_id) {
        return this.http.get(`students/${product_id}`).pipe(map(res => res.result));
    }

    updateProductDescription(product_id, data) {
        let format_data = Object.assign({}, data);
        delete format_data.id;
        return this.http.post(`students/${product_id}`, format_data).toPromise();
    }

    getAllCategory() {
        return this.http.get(`categories/lists`).pipe(map(res => res.result));
    }

    deleteProduct(product_id) {
        return this.http.delete(`products/${product_id}`).toPromise();
    }

    getRelatedProductList(product_id) {
        return this.http.get(`products/${product_id}/related`).pipe(map(res => res.result));
    }

    addRelatedProduct(product_id, data) {
        return this.http.post(`products/${product_id}/related`, data).toPromise();
    }

    deleteRelatedProduct(pro_id, related_product_id) {
        return this.http.delete(`products/${pro_id}/${related_product_id}/related/remove`).toPromise();
    }

    getAttributeList(product_id) {
        return this.http.get(`products/${product_id}/variant`).pipe(map(res => res));
    }

    getAttributeChain(product_id) {
        return this.http.get(`products/${product_id}/variant-set/list`).pipe(map(res => res.result), catchError(err => err.code === 404
            ? throwError("Not found")
            : throwError({ data: [] })
        ));
    }

    getLocation() {
        return this.http.get(`products/locations`).pipe(map(res => res.result), catchError( e => of({data:[]})));
    }

    getAtrributeSet() {
        return this.http.get(`variants/value`).pipe(map(res => res.result), catchError( e => of({data:[]})));
    }

    updateAttribute(pro_id, data) {
        return this.http.post(`products/${pro_id}/variant/edit`, data).toPromise();
    }

    deleteAttribute(pro_id, data) {
        return this.http.post(`products/${pro_id}/variant/delete`, data).toPromise();
    }

    deleteAttributeSet(pro_id) {
        return this.http.delete(`products/${pro_id}/variant-set/delete`).toPromise();
    }

    addAttributeSet(product_id, data) {
        return this.http.post(`products/${product_id}/variant-set/add`, data).toPromise();
    }

    addAttribute(product_id, data) {
        return this.http.post(`products/${product_id}/variant`, data).toPromise();
    }

    getImageList(product_id, attr_id) {
        return this.http.get(`products/${product_id}/${attr_id}/images`).pipe(map(res => res.result));
    }

    makeFeatureImage(product_id, data) {
        return this.http.post(`products/${product_id}/feature`, data).toPromise();
    }

    deleteProductImage(img_id) {
        return this.http.delete(`media/${img_id}/delete`).toPromise();
    }

    addVideoLink(product_id, data) {
        return this.http.post(`products/${product_id}/video`, data).toPromise();
    }



    getCategoryList(product_id) {
        return this.http.get(`products/${product_id}/category`).pipe(map(res => res.result));
    }


    getPriceList(product_id, attr_id) {
        return this.http.get(`products/${product_id}/${attr_id}/price`).pipe(map(res => res.result));
    }

    addProductPrice(product_id, attr_id, data) {
        return this.http.post(`products/${product_id}/${attr_id}/price`, data).toPromise();
    }

    addProductPriceInfo(product_id, attr_id, data) {
        return this.http.post(`products/${product_id}/${attr_id}/product/price`, data).toPromise();
    }

    getPriceInfo(product_id, attr_id) {
        return this.http.get(`products/${product_id}/${attr_id}/product/getprice`).pipe(map(res => res.result));
    }

    updateProductPrice(attr_id, data) {
        return this.http.post(`prices/${data.id}/${attr_id}`, data).toPromise();
    }

    deleteProductPrice(id) {
        return this.http.delete(`prices/delete/${id}`).toPromise();
    }

    getDetailsPageImage(id) {
        return this.http.get(`products/${id}/feature`).pipe(map(res => res.result));
    }

    getDetailsPageSummary(id) {
        return this.http.get(`products/${id}/summary`).pipe(map(res => res.result));
    }

    getTags() {
        return this.http.get(`classes`).pipe(map(res => res.result));
    }

    getSections() {
        return this.http.get(`sections`).pipe(map(res => res.result));
    }
    getSectionByClass(class_id) {
        return this.http.get(`section_list/${class_id}`).pipe(map(res => res.result));
    }

    getAvailability(product_id) {
        return this.http.get(`products-availabilities/${product_id}/reservation`).pipe(map(res => res.result));
    }

    addReservation(product_id, data) {
        return this.http.post(`products-availabilities/${product_id}/add`, data).toPromise();
    }

    updateReservation(data) {
        return this.http.post(`products-availabilities/edit`, data).toPromise();
    }

    deleteReservation(id) {
        return this.http.delete(`products-availabilities/${id}/delete`).toPromise();
    }

    getReservationList(page, limit) {
        return this.http.get(`products/reservation/list?page_no=${page ? page : 1}&limit=${limit ? limit : 10}`).pipe(map(res => res.result));
    }

    getProduct(product_id) {
        return this.http.get(`products/${product_id}/view`).pipe(map(res => res.result));
    }

    createOrder(data) {
        return this.http.post(`products/reservation/order`, data).toPromise();
    }

    getOrderStatus() {
        return this.http.get('order/status').pipe(map(res => res.result.data));
    }

    exportProduct(data) {
        return this.http.getBlob(`products/export${data}`);
    }

    getQtyListPro(page?, filter?, last_product_id?) {
        return this.http.get(`get-quantity-list?page_no=${page ? page : 1}&limit=100&last_product_id=${last_product_id}${filter ? filter : ''}`);
    }

    saveQtyPro(data) {
        return this.http.post(`update-quantity`, data).toPromise();
    }

    getCalenderData(id, params, v_p_id) {
        return this.http.get(`calendar/available?location=${GET_USER().location_id}&product_id=${id}&variants_products_id=${v_p_id}&start_date=${params.start_date}&end_date=${params.end_date}`)
        .pipe( map ( res => res.result), catchError( err => of({})))
    }

    // get product id for sidebar

    summarNote() {
        return {
            height: 220,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ol', 'ul', 'paragraph', 'height']],
                ['table', ['table']],
                ['insert', ['link']],
                ['view', ['undo', 'redo', 'fullscreen', 'codeview', 'help']]
            ]
        }
    }

    formatePrice(data) {
        if (data && data.length > 0) {
            return FormatPrice(data);
        }
        return data;
    }

    formateAttribute(data) {
        return FormateAttribute(data);
    }

    datePicker() {
        $('#purchase-date-start').datepicker({
            todayHighlight: true,
            orientation: "bottom left",
            format: 'yyyy-mm-dd',
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            },
            startDate: new Date()
        });
        $('#purchase-date-end').datepicker({
            todayHighlight: true,
            orientation: "bottom left",
            format: 'yyyy-mm-dd',
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            },
            startDate: new Date()
        });
    }

    getAvailableQty(res, quant, sd?, dur?) {
        const qty = res.filter((d) => {
            return this.checkDate(d.start_date, d.end_date, sd, dur) && (!d.order_id);
        }).map((q) => {
            return q.quantity;
        }).reduce((t, i) => {
            return t + i;
        }, 0);
        return quant - qty;
    }

    checkDate(s, e, i, d) {
        let date = new Date();
        if (i) {
            date = new Date(i);
        }
        let cur = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0).getTime();
        let curEnd = cur + (86400000 * (d - 1));
        let st = new Date(new Date(s).getFullYear(), new Date(s).getMonth(), new Date(s).getDate(), 0, 0).getTime();
        let end = new Date(new Date(e).getFullYear(), new Date(e).getMonth(), new Date(e).getDate(), 23, 59).getTime();
        return ((st <= cur) && (end >= cur)) || (end > cur && st < curEnd);
    }

    calculateEndFromArray(list) {
        let index = list.findIndex((d) => {
            return d['rent_type'] == 'daily';
        });
        if (index > -1) {
            return index;
        } else {
            let h = list.findIndex((d) => {
                return d['rent_type'] == 'hourly';
            });
            if (h > -1) {
                return h;
            } else {
                return list.findIndex((d) => {
                    return d['rent_type'] == 'weekly';
                });
            }
        }
    }

    calculateEndDate(Startdate, d) {
        let date = new Date(Startdate);
        let cur = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0).getTime();
        let end = new Date(cur + (86400000 * (d - 1)));
        return end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
    }

    getProId(route) {
        let id = route.parent.parent.parent.snapshot.params.product_id;
        id = id ? id : route.parent.parent.parent.parent.snapshot.params.product_id;
        return id;
    }

    FormatSelect2OptionData(data) {
        let formated_data = [];
        formated_data.push({ 'id': 0, 'text': '-Select Attribute-' });
        for (let att of data) {
            let obj = {};
            obj['id'] = att.id;
            obj['text'] = att.name;
            obj['children'] = this.formatSelect2List(att.attributes, 'name');
            formated_data.push(obj);
        }

        return formated_data;
    }

    formatToNumber(data) {
        let newData = [];
        for (let d of data) {
            newData.push(parseInt(d));
        }
        return newData;
    }

    formatSelect2List(data, prop) {
        for (let d of data) {
            d['name'] = d[prop];

        }
        return data;
    }

    formatAttributeList(data) {
        const arr = [], ids = [];
        for (let i of data) {
            const d = {
                id: i.attribute_set.map(a => a.attribute_id).join('-'),
                name: i.attribute_set.map((a) => a.attribute_set_name + '(' + a.attribute_name + ')').join(', '),
                default: i.default
            }
            const index = ids.indexOf(d.id);
            if (index > -1) {
                arr[index].location.push(i.location.id);
                if (d.default) {
                    arr[index]['default']++;
                }
            } else {
                const obj = {};
                obj['id'] = d.id;
                obj['chain'] = d.name;
                obj['location'] = [];
                obj['location'].push(i.location.id);
                obj['default'] = 0;
                if (d.default) {
                    obj['default']++;
                }
                arr.push(obj);
                ids.push(d.id);
            }
        }
        arr.sort((a, b) => {
            if (b.default == a.default) {
                return b.location.length - a.location.length;
            } else {
                return b.default - a.default;
            }

        });
        return arr;
    }

    formatQtyList(data, loc) {
        let i = 1;
        return data.map((d) => {
            d['id'] = i++;
            d.barcode = d.barcode ? d.barcode : '';
            const arr = [];
            d.location_data = d.location_data.map((l) => {
                l.location = parseInt(l.location);
                l['chain'] = d.chain;
                return l;
            });
            for (let l of loc) {
                let fl = d.location_data.find((f) => l.id == f.location);
                arr.push(fl ? fl : { attributes_products_id: null, location: l.id, quantity: 0, chain: d.chain });
            }
            d.location_data = arr;
            return d;
        });
    }

}
