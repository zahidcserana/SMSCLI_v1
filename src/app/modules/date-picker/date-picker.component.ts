import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnChanges, OnInit {
  rental_date: NgbDateStruct;
  minDate;
  @Input('init') init: boolean;
  @Input() placeholder: string;
  @Output() onSelectedDate = new EventEmitter;
  constructor(private config: NgbDatepickerConfig) {
    
  }

  ngOnChanges() {
    if(this.init) {
      const date = new Date();
      this.config.minDate = {year:date.getFullYear(), month:date.getMonth() + 1, day:date.getDate()};
      this.rental_date = {year:date.getFullYear(), month:date.getMonth() + 1, day:date.getDate()};
    }
  }

  ngOnInit() {
    
  }

  selectDate(e) {
    const formatDate = e.year + '-' + e.month + '-' + e.day;
    this.onSelectedDate.emit(formatDate);
  }



  generateDateFormat() {
    let day;
    let month;
    let year;
    const date = this.rental_date.year ? new Date(this.rental_date.year, this.rental_date.month, this.rental_date.day) : new Date();
    if (this.rental_date.year) {
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      year = date.getFullYear();
      month = date.getMonth() + 1;
    }
    day = date.getDate();
    const d = year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + 0;
    return d;
  }
}
