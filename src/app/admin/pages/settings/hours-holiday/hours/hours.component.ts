import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HoursHolidaysService, hoursTime, weekDays, WeekDays } from '../../setting-service/hours-holidays.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../../modules/alert/alert.service';

declare let $: any;

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit, AfterViewInit, OnDestroy {

  hoursGroup: any[] = [];
  weekDays: WeekDays[] = [];
  sub: Subscription;
  loading: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private service: HoursHolidaysService,
    private alertS: AlertService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activeRoute.data.subscribe(
      val => {
        // console.log(val)
        this.weekDays = this.service.formatWeekDays(val.weeks);
      }
    );
    this.hoursGroup = hoursTime;
  }

  ngAfterViewInit() {
    this.showBootstrapToggle();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private showBootstrapToggle() {
    for( let w of this.weekDays) {
      $('#open-' + w.day).bootstrapSwitch();
      $('#open-' + w.day).on('switchChange.bootstrapSwitch', () => {
        this.changeSwitch(w.day, true, '.bootstrap-switch-id-always-' + w.day);
      });
      $('#always-' + w.day).bootstrapSwitch();
      $('#always-' + w.day).on('switchChange.bootstrapSwitch', () => {
        this.changeSwitch(w.day, false);
      });
      if(!w.is_open) {
        $('.bootstrap-switch-id-always-' + w.day).hide();
      }
    }
  }

  private changeSwitch(day: number, open: boolean, id?:string) {
    const index = this.weekDays.findIndex( f => f.day === day);
    if(open) {
      this.weekDays[index].is_open = !this.weekDays[index].is_open;
      if(!this.weekDays[index].is_open) {
        $(id).hide();
        this.weekDays[index].always_open = true;
      } else {
        $(id).show();
      }
    } else {
      this.weekDays[index].always_open = !this.weekDays[index].always_open;
    }
  }

  submit() {
    this.loading = true;
    const sendData = this.service.formatSubmitData(this.weekDays);
    this.service.saveWeekDays(sendData)
    .then(
      res => {
        this.loading = false;
        console.log(res)
        if(res.status === 'OK' && res.result.message) {
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
        } else {
          this.alertS.error(this.alertContainer, res.result.error, true, 3000);
        }
      }
    )
    .catch(
      err => {
        this.loading = false;
        console.error(err);
        this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again', true, 3000);
      }
    );
  }

}
