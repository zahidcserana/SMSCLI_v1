import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Coupon } from '../../models/settings.models';
import { SettingService } from '../../setting-service/setting.service';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { Subscription } from 'rxjs';

declare let $:any;

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit, OnDestroy {

  loader: boolean;
  sub: Subscription;
  edit: boolean;

  @Input('coupon') coupon: Coupon;
  @Output('submit') submitForm: EventEmitter<any> = new EventEmitter();


  constructor(
    private settingS: SettingService,
    private sidebarS: SidebarService
  ) {}


  ngOnInit() {
    this.sub = this.settingS.addEditOpen.subscribe(
      val => {
        if(val.open) {
          // console.log(val);
          if(val.edit) {
            this.edit = val.edit;
            setTimeout(() => {
              this.datePicker();
              $('#Start-date').datepicker('update', new Date(this.coupon.start_time));
              $('#End-date').datepicker('update', new Date(this.coupon.end_time));
            }, 100);
          } else {
            this.coupon = new Coupon();
            this.edit = false;
            this.getCouponCode();
            setTimeout(() => {
              this.datePicker();
              $('#Start-date').datepicker('update', new Date(''));
              $('#End-date').datepicker('update', new Date(''));
            }, 100);
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private datePicker(){
    $('#Start-date').datepicker(this.settingS.datePickerObj());
    $('#End-date').datepicker(this.settingS.datePickerObj());
  }

  startDate(){
    $('#Start-date').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.coupon.start_time = this.settingS.getDate(date);
    });
  }

  endDate() {
    $('#End-date').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.coupon.end_time = this.settingS.getDate(date);
    });
  }

  getCouponCode() {
    this.settingS.getCouponCode().subscribe(
      res => {
        this.coupon.code = res.code;
      },
      err => console.log(err)
    );
  }

  submit(){
    this.loader = true;
    // console.log(this.coupon);
    this.settingS.addCoupon(this.coupon)
    .then(
      res => {
        console.log(res);
        this.sendEmitedData(res.result.data, false, 'Coupon has been added', true);
        this.coupon = new Coupon();
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData([], true, 'Something wrong! Coupon has been not added');
      }
    );
  }

  sendEmitedData(result, error, message, add?) {
    this.loader = false;
    // console.log(result);
    const emit_data = {data: result, alert: {error: error, message: message}, add: add};
    this.submitForm.emit(emit_data);
  }

  update() {
    this.loader = true;
    this.coupon.start_time = this.settingS.getDate(new Date(this.coupon.start_time));
    this.coupon.end_time = this.settingS.getDate(new Date(this.coupon.end_time));
    // console.log(this.coupon);
    this.settingS.updateCoupon(this.coupon)
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(res.result.data, false, 'Coupon has been updated', false);
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData([], true, 'Something wrong! Coupon has been not updated');
      }
    );
  }

}
