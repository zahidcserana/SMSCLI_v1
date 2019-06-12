import { Injectable, Optional } from "@angular/core";
import { HttpService } from "../../../../modules/http-with-injector/http.service";
import { SettingsServiceConfig } from "../models/settings.models";
import { map, catchError } from "rxjs/operators";
import { BehaviorSubject, of } from "rxjs";

declare let $: any;

@Injectable()
export class SettingService {
  config: SettingsServiceConfig;

  private COUPON = new BehaviorSubject<any>({ open: null, edit: null });
  addEditOpen = this.COUPON.asObservable();

  addEditChange(data) {
    this.COUPON.next(data);
  }

  editGateForm: BehaviorSubject<any> = new BehaviorSubject({
    edit: false,
    data: {}
  });

  editShippingForm: BehaviorSubject<any> = new BehaviorSubject({
    edit: false,
    data: {}
  });

  constructor(
    @Optional() config: SettingsServiceConfig,
    private http: HttpService
  ) {
    this.config = config;
  }

  datePickerObj() {
    return {
      todayHighlight: true,
      orientation: "bottom left",
      format: "yyyy-mm-dd",
      templates: {
        leftArrow: '<i class="la la-angle-left"></i>',
        rightArrow: '<i class="la la-angle-right"></i>'
      }
    };
  }

  formatGateWay(data) {
    const arr = { list: [], all: [] };
    for (let d in data) {
      const obj = {};
      obj["name"] = d;
      obj["status"] = 1;
      obj["is_online"] = true;
      obj["config"] = {};
      for (let i in data[d]) {
        const key = data[d][i];
        obj["config"][key] = "";
      }
      arr.all.push(obj);
      arr.list.push(d);
    }
    return arr;
  }

  formatShipping(data) {
    const arr = { list: [], all: [] };
    for (let d in data) {
      const obj = {};
      obj["name"] = d;
      obj["status"] = 1;
      obj["config"] = data[d];
      arr.all.push(obj);
      arr.list.push(d);
    }
    return arr;
  }

  getDate(date) {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  getCoupons(page, limit) {
    return this.http
      .get(`coupons?page_no=${page}&limit=${limit}`)
      .pipe(map(res => res.result));
  }

  getCouponCode() {
    return this.http.get(`coupons/get-coupns`).pipe(map(res => res.result));
  }

  addCoupon(data) {
    return this.http.post(`coupons`, data).toPromise();
  }

  updateCoupon(data) {
    return this.http.post(`coupons/${data.id}`, data).toPromise();
  }

  deleteCoupon(id) {
    return this.http.delete(`coupons/${id}`).toPromise();
  }

  deleteAccount(id) {
    return this.http.delete(`accounts/${id}`).toPromise();
  }

  getAttributeSets(page?, limit?, sort?) {
    return this.http
      .get(`variants/value?page_no=${page}&limit=${limit}${sort ? sort : ""}`)
      .pipe(map(res => res.result));
  }

  deleteAttributeSet(id) {
    return this.http.delete(`variants/${id}`).toPromise();
  }

  addAttributeSet(data) {
    return this.http.post(`variants`, data).toPromise();
  }

  updateAttributeSet(id, data) {
    return this.http.post(`variants/${id}`, data).toPromise();
  }

  addAttribute(data, id) {
    return this.http.post(`variants/${id}/value`, data).toPromise();
  }

  updateAttribute(v_id, id, data) {
    return this.http.post(`variants/${v_id}/value/${id}`, data).toPromise();
  }

  deleteAttribute(id) {
    return this.http.delete(`variants/value/${id}`).toPromise();
  }

  getTags() {
    return this.http.get(`tags`).pipe(map(res => res.result));
  }

  addTag(data) {
    return this.http.post(`tags`, data).toPromise();
  }

  updateTag(id, data) {
    return this.http.post(`tags/${id}`, data).toPromise();
  }

  deleteTag(id) {
    return this.http.delete(`tags/${id}`).toPromise();
  }

    getClasses() {
    return this.http.get(`classes`).pipe(
      map(res => res.result),
      catchError(e => of({ data: [] }))
    );
  }
  getterminals() {
    return this.http.get(`locations`).pipe(
      map(res => res.result),
      catchError(e => of({ data: [] }))
    );
  }

  addTerminal(data) {
    return this.http.post(`locations`, data).toPromise();
  }
  addClass(data) {
    return this.http.post(`classes`, data).toPromise();
  }

  updateTerminal(data) {
    return this.http.post(`locations/${data.id}`, data).toPromise();
  }
  updateClass(data) {
    return this.http.post(`classes/${data.id}`, data).toPromise();
  }

  deleteTerminal(id) {
    return this.http.delete(`locations/${id}`).toPromise();
  }
  deleteClass(id) {
    return this.http.delete(`classes/${id}`).toPromise();
  }

  addStoreTerminal(data) {
    return this.http.post(`terminals`, data).toPromise();
  }

  updateStoreTerminal(data) {
    return this.http.post(`terminals/${data.id}`, data).toPromise();
  }

  deleteStroeTerminal(id) {
    return this.http.delete(`terminals/${id}`).toPromise();
  }

  getSupplier(page, limit) {
    return this.http
      .get(`suppliers?page_no=${page}&limit=${limit}`)
      .pipe(map(res => res.result));
  }
  getSection(page, limit) {
    return this.http
      .get(`sections?page_no=${page}&limit=${limit}`)
      .pipe(map(res => res.result));
  }

  addSupplier(data) {
    return this.http.post(`suppliers`, data).toPromise();
  }
  addSection(data) {
    return this.http.post(`sections`, data).toPromise();
  }

  updateSupplier(data) {
    return this.http.post(`suppliers/${data.id}`, data).toPromise();
  }
  updateSection(data) {
    return this.http.post(`sections/${data.id}`, data).toPromise();
  }

  deleteSupplier(id) {
    return this.http.delete(`suppliers/${id}`).toPromise();
  }
  deleteSection(id) {
    return this.http.delete(`sections/${id}`).toPromise();
  }

  getGatewaySettings() {
    return this.http.get(`payments/gateway/settings`);
  }

  getGateways() {
    return this.http.get(`payments/gateway`);
  }
  getAccounts(p, l, query?) {
      const params = query ? query : '';
      return this.http
          .get(`accounts?page_no=${p ? p : 1}&limit=${l ? l : 20}${params}`)
          .pipe(map(res => res));
  }
  getDeliveryCondition() {
    return this.http.get(`delivery-settings`).pipe(
      map(m => m.result.data),
      catchError(e => of(null))
    );
  }

  saveDeliveryCondition(data) {
    return this.http.post(`delivery-settings`, data).toPromise();
  }

  getDeliveryDistance(id) {
    return this.http.get(`locations/${id}`).pipe(
      map(m => m.result.data),
      catchError(e => of(null))
    );
  }

  saveDeliveryDistance(data, id) {
    return this.http.post(`locations/${id}`, data).toPromise();
  }

  getDeliveryZone() {
    return this.http.get(`delivery-zone`).pipe(
      map(m => m.result.data),
      catchError(e => of([]))
    );
  }

  saveDeliveryZone(data, id) {
    if (id) {
      return this.http.post(`delivery-zone/${id}`, data).toPromise();
    } else {
      return this.http.post(`delivery-zone`, data).toPromise();
    }
  }

  deleteDeliveryZone(id) {
    return this.http.delete(`delivery-zone/${id}`).toPromise();
  }

  getLocationWithAddress() {
    return this.http.get(`locations/all`).pipe( map ( m => m.result.data), catchError( e => of([])));
  }

  getShippingSettings() {
    return this.http.get(`shipping/gateway/settings`);
  }

  getFedexService() {
    return this.http.get(`fedex-service-list`).pipe( map ( m => m.result.data), catchError( e => of({})));
  }

  getShippings() {
    return this.http.get(`carrier-list`);
  }

  changeShippingStatus(id, data) {
    return this.http.post(`shipping/change-status/${id}`, data).toPromise();
  }

  deleteShipping(id) {
    return this.http.delete(`delete-carrier/${id}`).toPromise();
  }

  addUpdateShipping(data, id, edit, submit) {
    let promise: Promise<any>;
    if (edit && id) {
      promise = this.http.post(`update-carrier/${id}`, data).toPromise();
    } else {
      promise = this.http.post(`connect-carrier`, data).toPromise();
    }
    return this.afterPromise(promise, submit);
  }

  private afterPromise(promise, submit) {
    return promise
      .then(res => {
        // console.log(res);
        if (res.status === "OK" && 'message' in res.result) {
          this.sendEmitedData(true, res.result.message, submit);
        } else {
          this.sendEmitedData(false, res.result.error, submit);
        }
        return this.falseLoader();
      })
      .catch(err => {
        console.log(err);
        this.sendEmitedData(
          false,
          "Something wrong!!! Please try again.",
          submit
        );
        return this.falseLoader();
      });
  }

  addUpdateGateway(data, id, edit, submit) {
    let promise: Promise<any>;
    if (edit && id) {
      promise = this.http.post(`payments/gateway/${id}`, data).toPromise();
    } else {
      promise = this.http.post(`payments/gateway`, data).toPromise();
    }
    return this.afterPromise(promise, submit);
  }

  addAccount(data) {
        return this.http.post(`accounts`, data).toPromise();
  }
  updateAccount(data) {
        return this.http.post(`accounts/${data.id}`, data).toPromise();
  }

  private falseLoader() {
    const loader: Promise<any> = new Promise((resolve, reject) => {
      resolve(false);
    });
    return loader;
  }

  sendEmitedData(error, message, submit) {
    let emit_data;
    emit_data = { status: error, message: message };
    
    submit.emit(emit_data);
  }
}
