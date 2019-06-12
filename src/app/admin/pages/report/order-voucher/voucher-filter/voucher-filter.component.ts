import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VoucherSearch } from '../../models/report-models';
import { FORMAT_SEARCH } from '../../../../../globals/_classes/functions';


declare let $:any;
declare var moment: any;

@Component({
  selector: 'voucher-filter',
  templateUrl: './voucher-filter.component.html',
  styleUrls: ['./voucher-filter.component.css']
})
export class VoucherFilterComponent implements OnInit, AfterViewInit {

  voucher: VoucherSearch;
  filter: string;
  search: boolean;

  @Output('loadList') loadList: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.voucher = new VoucherSearch();
  }

  ngAfterViewInit() {
    this._dateRange();
  }

  submitSearch() {
    if(this.voucher.amount) {
      this.voucher.amount_type = $('#trx-amountType').val();
    }
    // console.log(this.voucher);
    this.filter = FORMAT_SEARCH(this.voucher);
    // console.log(this.filter);
    if(this.filter) {
      this.loadList.emit(this.filter);
      this.search = true;
    }
  }

  resetSearch() {
    this.voucher = new VoucherSearch();
    this.voucher.transaction_start = null;
    this.voucher.transaction_end = null;
    this.filter = null;
    if(this.search) {
      this.loadList.emit('');
      this.search = false;
    }
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
        this.voucher.transaction_start = start.format('YYYY-MM-DD');
        this.voucher.transaction_end = end.format('YYYY-MM-DD');
        $('#m_daterangepicker_3 .form-control').val( 'From ' + start.format('YYYY-MM-DD') + ' To ' + end.format('YYYY-MM-DD'));
      });
  }
  

}
