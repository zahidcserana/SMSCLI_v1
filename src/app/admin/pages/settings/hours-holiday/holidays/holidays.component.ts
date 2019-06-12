import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HoursHolidaysService, Holiday } from '../../setting-service/hours-holidays.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { calandarDateFormat } from '../../../../../globals/_classes/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  holidays: Holiday[] = [];
  holiday: Holiday;
  edit: boolean;
  deleteId: number = null;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private service: HoursHolidaysService,
    private alertS: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getHolidays();
    this.holiday = new Holiday();

  }

  trackByHoildays(index, item) {
    return item.id ? item.id : null;
  }

  private getHolidays() {
    this.service.getHolidaysList()
    .subscribe(
      res => {
        this.holidays = res;
      },
      err => {
        console.error(err)
      }
    );
  }

  getDate(date) {
    return calandarDateFormat(date)
  }

  editHoliday(h) {
    this.holiday = h;
    this.edit = true;
  }

  alerts(e) {
    if(e.type === 'info') {
      this.alertS.info(this.alertContainer, e.message, true, 3000);
    } else if(e.type === 'success') {
      this.getHolidays();
      this.alertS.success(this.alertContainer, e.message, true, 3000);
    } else if(e.type === 'error') {
      this.alertS.error(this.alertContainer, e.message, true, 3000);
    } else {
      if('edit' in e) {
        this.edit = e.edit;
        this.holiday = e.data;
      }
    }
  }

  deleteHoliday(h, i, holidayComp) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          this.deleteId = h.id;
          holidayComp.resetAll();
          this.archiveHoliday(h.id, i);
        }
      }, (res) => {
        console.log(res);
      });

  }

  archiveHoliday(id, i) {
    this.service.deleteHoliday(id).then(
      res => {
        this.deleteId = null;
        if (res.status === 'OK' && res.result.message) {
          this.holidays.splice(i, 1);
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
        } else {
          this.alerts({ type: 'error', message: res.result.error });
        }
      }
    ).catch (
      err => {
        this.deleteId = null;
        console.log(err);
        this.alerts({type: 'error', message: 'Something went wrong! Please try again'});
      }
    )
  }

}
