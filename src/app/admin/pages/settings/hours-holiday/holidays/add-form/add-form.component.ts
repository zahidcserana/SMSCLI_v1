import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { Holiday, HoursHolidaysService } from '../../../setting-service/hours-holidays.service';
import { convertTime12to24, GETTIME } from '../../../../../../globals/_classes/functions';

declare let $: any;

@Component({
  selector: 'holiday-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnChanges, OnInit, AfterViewInit {

  @Input('holiday') holiday: Holiday;
  @Input('edit') edit: boolean;
  @Output('output') message: EventEmitter<any> = new EventEmitter();

  holidayDates;
  loading: boolean;

  constructor(
    private service: HoursHolidaysService
  ) { }

  ngOnChanges() {
    if (this.edit) {
      this.updateDate(this.holiday.start_date, this.holiday.end_date);
    }
  }

  ngOnInit() {
    this.resetHolidayDate();
  }

  ngAfterViewInit() {
    this.dateTimePicker();
  }

  private resetHolidayDate() {
    this.holidayDates = {
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: ''
    };
  }

  private dateTimePicker() {
    this.service.datePicker();
    this.service.timePicker();
    this.rentalDateChange();
    this.rentalTimeChange();
  }

  private rentalDateChange() {
    $('#holiday-date-start').datepicker().on('changeDate', (e) => {
      let date = e.date;
      this.holidayDates.start_date = this.service.getCurrentDateTime(date);
    });
    $('#holiday-date-end').datepicker().on('changeDate', (e) => {
      let date = e.date;
      this.holidayDates.end_date = this.service.getCurrentDateTime(date);
    });
  }

  private rentalTimeChange() {
    $('#holiday-time-start').on('change', () => {
      let time = $('#holiday-time-start').data('timepicker').getTime();
      this.holidayDates.start_time = convertTime12to24(time);
    });
    $('#holiday-time-end').on('change', () => {
      let time = $('#holiday-time-end').data('timepicker').getTime();
      this.holidayDates.end_time = convertTime12to24(time);
    });
  }

  submit() {
    this.loading = true;
    if (this.checkDates()) {
      this.holiday.start_date = this.holidayDates.start_date + ' ' + (this.holidayDates.start_time ? this.holidayDates.start_time : "00:00");
      this.holiday.end_date = this.holidayDates.end_date + ' ' + (this.holidayDates.end_time ? this.holidayDates.end_time : "23:59");
      this.service.saveHolidays(this.holiday)
        .then(
          res => {
            this.loading = false;
            if (res.status === 'OK' && res.result.message) {
              this.sendMessage({ type: 'success', message: res.result.message });
              this.resetAll();
            } else {
              this.sendMessage({ type: 'error', message: res.result.error });
            }
          }
        )
        .catch(
          err => {
            console.error(err);
            this.loading = false;
            this.sendMessage({ type: 'error', message: 'Something went wrong!!! Please try again' });
          }
        )
    } else {
      this.sendMessage({ type: 'info', message: 'Plesae select dates' });
    }

  }

  resetAll() {
    this.sendMessage({ edit: false, data: new Holiday() });
    this.resetHolidayDate();
    this.updateDate();
  }

  private updateDate(start?, end?) {
    $('#holiday-date-start').datepicker('update', start ? new Date(start) : '');
    $('#holiday-date-end').datepicker('update', end ? new Date(end) : '');
    const s = start ? GETTIME(start) : '12:00 AM';
    const e = end ? GETTIME(end) : '11:59 PM';
    $('#holiday-time-start').timepicker('setTime', s);
    $('#holiday-time-end').timepicker('setTime', e);
  }

  private sendMessage(data) {
    this.message.emit(data);
  }

  private checkDates() {
    if (this.edit) {
      this.holidayDates.start_date = this.holidayDates.start_date ? this.holidayDates.start_date : this.holiday.start_date.split(' ')[0];
      this.holidayDates.end_date = this.holidayDates.end_date ? this.holidayDates.end_date : this.holiday.end_date.split(' ')[0];
      this.holidayDates.start_time = this.holidayDates.start_time ? this.holidayDates.start_time : this.holiday.start_date.split(' ')[1];
      this.holidayDates.end_time = this.holidayDates.end_time ? this.holidayDates.end_time : this.holiday.end_date.split(' ')[1];
    }
    return this.holidayDates.start_date && this.holidayDates.end_date;
  }

}
