import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { OrderSearch } from '../../models/order-models';
import { HttpInspectorService } from '../../../../../modules/http-with-injector/http-inspector.service';
import { FORMAT_SEARCH } from '../../../../../globals/_classes/functions';
import { OrderService } from '../../order.service/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

declare let $:any;

interface SalesMan{
  id: number;
  name: string;
}

@Component({
  selector: 'order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  orderSearch: OrderSearch;
  filter: string;
  salesMan: SalesMan[] = [];
  search: boolean;
  status: string[] = [];
  location = [];
  sub: Subscription;

  @Input('staustId') staustId;
  @Output('loadList') loadList: EventEmitter<string> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private orderS: OrderService
  ) { }

  ngOnInit() {
    this.getStatus();
    this.getSalesmanList();
    this.getLocation();
    this.sub = this.route.paramMap.subscribe(
      val => {
        this.reset();
      }
    );
  }

  ngAfterViewInit() {
    this.datePicker();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getLocation() {
    this.orderS.getLocations().subscribe(
      res => {
        if(res.status == 'OK') {
          this.location = res.result.data.map((m) => {
            return {id: m.id, name: m.name};
          });
        } else {
          this.location = [];
        }
      }, 
      err => {
        this.location = [];
        console.log(err);
      }
    );
  }

  getStatus() {
    this.orderS.getOrderStatus().subscribe(
      res => {
        this.status = Object.values(res);
      },
      err => console.log(err)
    );
  }

  getSalesmanList() {
    this.orderS.getAdminList().subscribe(
      res => {
        this.salesMan = res.data;
      },
      err => console.log(err)
    );
  }

  searchUsers(){
    // console.log(this.orderSearch);
    this.filter = FORMAT_SEARCH(this.orderSearch);
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
    this.orderSearch = new OrderSearch();
    this.orderSearch.created = null;
  }

  orderDateChange() {
    $('#order-date').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.orderSearch.created = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      // console.log(this.orderSearch.created);
    });
  }

  private datePicker(){
    $('#order-date').datepicker({
      todayHighlight: true,
      orientation: "bottom left",
      format: 'yyyy-mm-dd',
      templates: {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>'
      }
    });
  }

}
