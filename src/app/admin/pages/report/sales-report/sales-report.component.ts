import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { ReportService } from '../report.service/report.service';
import { SalesReportList } from '../models/report-models';
import { downloadFile } from '../../../../globals/_classes/functions';
import { AlertService } from '../../../../modules/alert/alert.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  salesReport: SalesReportList[] = [];
  pagi: Pagi = new Pagi();
  loader: boolean;
  filter: string = '';
  status = [];
  stores = [];
  terminals = [];
  loaderExport: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alertS: AlertService,
    private reportS: ReportService
  ) { 
    this.getSalesReport(1, 20, '');
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getStatus();
    this.getlocation();
  }

  trackReport(index, tran) {
    return tran ? tran.id : null;
  }

  getDate(d) {
    if(d) {
        return new Date(d);
    }
    return '';
  }

  reloadTable(e) {
    this.getSalesReport(e.page, e.limit, this.filter);
  }

  getSalesReport (p?, l?, f?) {
    this.loader = true;
    this.reportS.getSalesReport(p, l, f).subscribe(
      res => {
        // console.log(res);
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.salesReport = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
  }

  filterList(e){
    this.filter = e;
    // console.log(e);
    this.getSalesReport(1, 20, this.filter);
  }

  getStatus() {
    this.reportS.getOrderStatus().subscribe(
      res => {
        this.status = [];
        for(let s in res) {
          const obj = {};
          obj['id'] = parseInt(s);
          obj['name'] = res[s];
          this.status.push(obj); 
        }
        // console.log(this.status);
      },
      err => console.log(err)
    );
  }

  getlocation() {
    this.terminals = [];
    this.reportS.getterminals().subscribe(
      res => {
        if(res.status == 'OK') {
          this.stores = res.result.data;
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
  getTotal(s, t, de, di) {
    return (s ? s : 0) + (t ? t : 0) + (de ? de : 0) - (di ? di :0);
  }

  exportSales() {
    this.loaderExport = true;
    const params = this.filter ? '?' + this.filter.slice(1) : '';
    // console.log(params);
    this.reportS.exportSales(params).then(
      res => {
        downloadFile(res);
        this.loaderExport = false;
      },
      err => {
        console.log(err);
        this.loaderExport = false;
        this.alertS.error(this.alertContainer, 'Something wrong!!! Please try again', true, 3000);
      }
    );
  }


}
