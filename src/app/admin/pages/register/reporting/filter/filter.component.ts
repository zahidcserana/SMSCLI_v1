import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FORMAT_SEARCH } from '../../../../../globals/_classes/functions';
import { SearchRegister } from '../../models/register-models';
import { RegisterService } from '../../register.service/register.service';

declare let $:any;
declare var moment: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  register: SearchRegister;
  filter: string;
  search: boolean;
  terminals = [];

  @Input('stores') stores;
  @Output('loadList') loadList: EventEmitter<string> = new EventEmitter();

  constructor(private registerS: RegisterService) {
    this.getlocation();
   }

  ngOnInit() {
    this.register = new SearchRegister();
  }

  ngAfterViewInit() {
    this._dateRange();
  }

  getlocation() {
    this.terminals = [];
    this.registerS.getterminals().subscribe(
      res => {
        if(res.status == 'OK') {
          for(let s of res.result.data) {
            for(let t of s.stores_terminals) {
              const obj = {};
              obj['id'] = t.id;
              obj['name'] = s.store_name + ' - ' + t.name;
              this.terminals.push(obj);
            }
          }
        }
      }, err => console.log(err)
    );
  }

  submitSearch() {
    this.filter = FORMAT_SEARCH(this.register);
    // console.log(this.filter);
    if(this.filter) {
      this.loadList.emit(this.filter);
      this.search = true;
    }
  }

  resetSearch() {
    this.register = new SearchRegister();
    this.register.date_start = null;
    this.register.date_end = null;
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
        this.register.date_start = start.format('YYYY-MM-DD');
        this.register.date_end = end.format('YYYY-MM-DD');
        $('#m_daterangepicker_3 .form-control').val( 'From ' + start.format('YYYY-MM-DD') + ' To ' + end.format('YYYY-MM-DD'));
      });
  }

}
