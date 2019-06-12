import { Component, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { SalesReport } from '../../models/report-models';
import { FORMAT_SEARCH } from '../../../../../globals/_classes/functions';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

declare let $:any;
declare var moment: any;

@Component({
  selector: 'sales-report-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements AfterViewInit, OnDestroy {

  salesReport: SalesReport;
  filter: string;
  search: boolean;
  sub: Subscription;

  @Input('status') status;
  @Input('stores') stores;
  @Input('terminals') terminals;
  @Output('loadList') loadList: EventEmitter<string> = new EventEmitter();

  constructor(private route: ActivatedRoute,) { 
    this.salesReport = new SalesReport();
    this.sub = this.route.paramMap.subscribe(
      val => {
        this.reset();
      }
    );
  }

  ngAfterViewInit() {
    this._dateRange();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  searchSalesReport(){
    // console.log(this.salesReport);
    this.filter = FORMAT_SEARCH(this.salesReport);
    // console.log(this.filter);
    if(this.filter) {
      this.loadList.emit(this.filter);
      this.search = true;
    }
  }

  resetSearch(){
    this.reset();
    this.filter = null;
    if(this.search) {
      this.loadList.emit('');
      this.search = false;
    }
  }

  reset() {
    this.salesReport = new SalesReport();
    this.salesReport.date_start = null;
    this.salesReport.date_end = null;
  }

  private _dateRange() {
    $('#m_daterangepicker_3').daterangepicker({
      opens: 'left',
      startDate: moment(),
      endDate: moment().endOf('month'),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      autoUpdateInput: true,
      buttonClasses: 'm-btn btn',
      applyClass: 'btn-brand',
      cancelClass: 'btn-danger'
    }, (start, end, label) => {
      this.salesReport.date_start = start.format('YYYY-MM-DD');
      this.salesReport.date_end = end.format('YYYY-MM-DD');
        $('#m_daterangepicker_3 .form-control').val( 'From ' + start.format('YYYY-MM-DD') + ' To ' + end.format('YYYY-MM-DD'));
      });
  }
}
