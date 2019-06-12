import {Injectable, Optional} from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';;
import { OrderServiceConfig, Customer, Payment } from '../models/order-models';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { FormatPrice, FormateAttribute, isJson, GET_USER } from '../../../../globals/_classes/functions';

class Update {
    from: string;
    data: any;
    update: boolean;
}

@Injectable()
export class OrderService implements Resolve<any> {

    config: OrderServiceConfig;

    private subject = new BehaviorSubject<any>(null);
    addUpdateOrder = this.subject.asObservable();

    private updateSideBarData = new BehaviorSubject<any>(new Update());
    updateData = this.updateSideBarData.asObservable();

    updateOrder(data) {
        this.subject.next(data);
    }
    update(data: Update) {
        this.updateSideBarData.next(data);
    }

    constructor(
        @Optional() config: OrderServiceConfig,
        private http: HttpService
    ) {
        this.config = config;
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if(route.routeConfig.path == 'rental-orders') {
            return this.getOrderList(1, 20, 1, '', '');
        } else {
            const id = this.getStatusId(route.params.status);
            // console.log(id);
            let s = id === 0 || id ? '&status=' + id : '';
            return this.getOrderList(1, 20, 0, s, '');
        }
    }

    getStatusId(s) {
        // console.log(s);
        if (!s || s == 'all') {
            return null;
        } else {
            let li = s.lastIndexOf('-');
            return parseInt(s.slice(li + 1));
        }
    }

    getOrderId(route) {
        let id = route.parent.parent.snapshot.params.order_id;
        id = id ? id : route.parent.parent.parent.parent.snapshot.params.order_id;
        return id;
    }

    getId(route) {
        let id = route.parent.parent.params.order_id;
        id = id ? id : route.parent.parent.parent.parent.params.order_id;
        return id;
    }

    getDate(d) {
        if(d) {
            return new Date(d);
        }
        return '';
    }

    getStatus(s, data) {
        return data[parseInt(s)-1];
    }

    checkStatus(s) {
        switch (s) {
            case 1:
                return 'm-badge--info';
            case 2:
                return 'm-badge--warning';
            case 3:
                return 'm-badge--success';
            case 4:
                return 'm-badge--danger';
            case 5:
                return 'm-badge--primary';
            case 6:
                return 'm-badge--brand';
            case 7:
                return 'm-badge--info';
            default:
                return 'm-badge--brand';
        }
    }

    formateCustomer(data, cus: Customer) {
        cus.first_name = data.first_name;
        cus.last_name = data.last_name;
        cus.email = data.email;
        if(data.primary_addres) {
            cus.phone = data.primary_addres.phone;
            cus.mobile = data.primary_addres.mobile;
            cus.address_line1 = data.primary_addres.address_line1;
            cus.city = data.primary_addres.city;
            cus.country_id = data.primary_addres.country_id;
            cus.state_id = data.primary_addres.state_id;
            cus.zipcode = data.primary_addres.zipcode;
        }
        return cus;
    }

    formateNewOrder(data, cus:Customer) {
        let order = {
            id:null,created:null,name:null,address:null,country:null,state:null,city:null,zipcode:null, status:null
        };
        order['id'] = data.order_id; 
        order['status'] = cus['status'];
        order['created'] = data.order_date;
        order['name'] = cus.first_name + ' ' + (cus.last_name || '');
        order['address'] = cus.address_line1 || null;
        order['country'] = cus.country_id || null;
        order['state'] = cus.state_id || null;
        order['city'] = cus.city || null;
        order['zipcode'] = cus.zipcode || null;
        // console.log(order);
        return order;
    }


    formatePrice(data) {
        if(data && data.length > 0) {
            return FormatPrice(data);
        }
        return { base: {}, rent: [] };
    }

    formateAttribute(data) {
        return FormateAttribute(data);
    }

    getCurrentDateTime(date) {
      let obj = {date: '', time: ''};
      obj['date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      obj['time'] = date.getHours()+':'+date.getMinutes();
      return obj;
    }

    formateDate(data) {
        if(data) {
          return data.date + ' ' + data.time;
        }
        return null;
      }

    formateListDate(d) {
        if(d) {
            return new Date(d);
        } 
        return '';
    }


    getPaymentMethod(t, data) {
        if(data && data.length > 0) {
            return data[t-1];            
        }
    }

    getPaidTotal(data) {
        return data.map((a) => {
            return a['payment_amount']; 
        }).reduce((t, n) => {
            return t + n;
        }, 0);
    }

    formatePaymentEdit(data) {
        let payment = new Payment();
        payment.id = data.id;
        payment.order_id = data.order_id;
        payment.type = data.type;
        payment.payment_method = data.payment_method;
        payment.payment_amount = data.payment_amount;
        payment.note = data.note;
        return payment;
    }

    // formateOrderDetails(val, data) {
    //     data.tax = val.tax;
    //     data.total_quantity = val.total_quantity;
    //     data.total_price = val.total_price;
    //     data.delivery_charge = val.delivery_charge;
    //     data.total_discount = val.total_discount;
    //     data.vat = val.vat;
    //     return data;
    // }

    getTotalDeposit(order) {
        return order.map((d) => {
            return d.deposit_amount;
            }).reduce((total, item) => {
            return total + item;
            }, 0);
    }

    getAvailableQty(pro, sd?, dur?) {
        const qty = pro.products_availabilities.filter((d) => {
            return this.checkDate(d.start_date, d.end_date, sd, dur);
        }).map((q) => {
            return q.quantity;
        }).reduce((t, i) => {
            return t +i;
        },0);
        let quant = pro.quantity - qty;
        return  quant < 0 ? 0 : quant;
    }

    checkDate(s, e, i, d) {
        let date = new Date();
        if(i) {
            date = new Date(i);
        }
        let cur = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0).getTime();
        let curEnd = cur + (86400000 * (d-1));
        // console.log(new Date(curEnd), d);
        let st = new Date(new Date(s).getFullYear(),new Date(s).getMonth(), new Date(s).getDate(), 0, 0).getTime();
        let end = new Date(new Date(e).getFullYear(),new Date(e).getMonth(), new Date(e).getDate(), 23, 59).getTime();
        return ((st <= cur) && (end >= cur)) || (end > cur && st < curEnd);
    }

    getTextResponse(text) {
        const arr = [];
        if(text && isJson(text)) {
            const data = JSON.parse(text);
            for(let d in data) {
                let obj = {};
                obj['key'] = d;
                obj['value'] = data[d];
                arr.push(obj);
            }
        }
        return arr;
    }



    /******************** All API for reservations ******************/

    getterminals() {
        return this.http.get(`locations`).pipe(map(res => res));
    }

    getOrderStatus() {
        return this.http.get('order/status').pipe(map( res=> res.result.data)); 
    }

    changeStatus(id, s_id) {
        return this.http.get(`orders/${id}/status/${s_id}`).toPromise();
    }

    getOrderList(page?, limit?, rent?, status?, filter?, sort?) {
        return this.http.get('orders?page_no=' + (page ? page : 1) +'&limit=' + (limit ? limit : 10) + '&rental_orders=' + rent + status + filter + (sort ? sort : '')).pipe(map( res=> res.result));
    }

    getAdminList() {
        return this.http.get('users/admin').pipe(map( res=> res.result));
    }

    getCustomer(user_id) {
        return this.http.get(`users/customer/${user_id}`).pipe(map( res=> res.result));
    }

    getOrderCustomer(order_id) {
        return this.http.get(`orders/customer/${order_id}`).pipe(map( res=> res.result));
    }

    addCustomer(data) {
        return this.http.post(`customer/add`, data).toPromise();
    }

    updateCustomer(order_id, data) {
        return this.http.post(`orders/customer/${order_id}`, data).toPromise();
    }

    deleteOrder(id) {
        return this.http.delete(`orders/${id}`).toPromise();
    }

    getProduct(attr_id) {
        return this.http.get(`products/view/variant-product/${attr_id}`).pipe(map( res => res.result));
    }

    getProductList(id) {
        return this.http.get(`orders/${id}`).pipe(map( res=> res.result));
    }

    searchProduct(search) {
        const loc = GET_USER().location_id;
        return this.http.get(`products/search?location=${loc}&${search}`);
    }

    addItem(data, edit) {
        if(edit) {
            return this.http.post(`orders/update-item`, data).toPromise();
        } else {
            return this.http.post(`orders/add-item`, data).toPromise();
        }
    }

    deleteItem(id) {
        return this.http.delete(`orders/item/${id}/delete`).toPromise();
    }

    getPaymentAmount(id) {
        return this.http.get(`payments/${id}/amount`).pipe(map( res=> res.result));
    }

    getPaymentList(id) {
        return this.http.get(`payments/${id}/all`).pipe(map( res=> res.result));
    }

    addPayment(data) {
        return this.http.post(`payments`, data).toPromise();
    }

    updatePayment(data) {
        return this.http.post(`payments/${data.id}`, data).toPromise();
    }

    deletePayment(id) {
        return this.http.delete(`payments/${id}`).toPromise();
    }

    getOrderDetails(id) {
        return this.http.get(`orders/${id}/review`).pipe(map( res=> res.result));
    }

    getRefundList(id) {
        return this.http.get(`orders/${id}/deposits`).pipe(map( res=> res.result));
    }

    getRefunds(id) {
        return this.http.get(`orders/refund/list/${id}`).pipe(map( res=> res.result));
    }

    addRefund(data) {
        return this.http.post(`orders/refund`, data).toPromise();
    }

    deleteRefund(id) {
        return this.http.delete(`orders/refund/${id}`).toPromise();
    }

    getLocations() {
        return this.http.get(`locations`).pipe(map(res => res));
    }

    getTransaction(id) {
        return this.http.get(`payment-log/${id}`).pipe(map( res=> res.result));
    }

    callVoid(data) {
        return this.http.post(`orders/void`, data).toPromise();
    }

    callRefund(data) {
        return this.http.post(`orders/refund`, data).toPromise();
    }

    callCaptured(data) {
        return this.http.post(`orders/capture`, data).toPromise();
    }

    getDeliveryDetails(id) {
        return this.http.get(`delivery-details/${id}`).pipe(map( res=> res.result.data), catchError(e => of(null)));
    }

    // getPDF(id) {
    //     return this.http.getBlob(`pages/pdf?order_id=${id}`);
    // }

}
