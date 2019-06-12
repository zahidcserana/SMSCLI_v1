import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContentService } from '../../setting-service/contents.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../modules/alert/alert.service';

@Component({
  selector: 'app-time-zone',
  templateUrl: './time-zone.component.html',
  styleUrls: ['./time-zone.component.css']
})
export class TimeZoneComponent implements OnInit, OnDestroy {

  timeForm: FormGroup;
  loading: boolean;
  zoneList = [];
  sub: Subscription;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private service: ContentService, 
    private activeRoute: ActivatedRoute,
    private alert: AlertService,
    private fb: FormBuilder
  ) {
      this.sub = activeRoute.data.subscribe(
        val => {
          this.zoneList = val['list'];
        }
      );
   }

  ngOnInit() {
    this.timeForm = this.fb.group({
      timezone: ''
    });

    this.service.getTimeZone().subscribe(
      res => {
        if('timezone' in res) {
          this.timeForm.patchValue(res);
        }
      }, err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save () {
    this.loading = true;
    this.service.saveTimeZone(this.timeForm.value)
    .then(
      res => {
        this.loading = false;
        if(res.result) {
          this.alert.error(this.alertContainer, res.result.error, true, 3000);
        } else {
          this.alert.success(this.alertContainer, 'Time Zone has been saved', true, 3000);
        }
      }
    )
    .catch(
      err => {
        this.loading = false;
        this.alert.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
      }
    )
  }

}
