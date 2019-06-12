import { Component, OnInit } from '@angular/core';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { ReportService } from '../report.service/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-order-voucher',
  templateUrl: './order-voucher.component.html',
  styleUrls: ['./order-voucher.component.css']
})
export class OrderVoucherComponent implements OnInit {

  transactions = [];
  pagi: Pagi = new Pagi();
  loader: boolean;
  filter: string = '';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private reportS: ReportService
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getTansactionList(1, 20, '');
  }

  trackTransaction(index, tran) {
    return tran ? tran.id : null;
  }

  getDate(d) {
    if(d) {
        return new Date(d);
    }
    return '';
  }

  reloadTable(e) {
    this.getTansactionList(e.page, e.limit, this.filter);
  }

  getTansactionList (p?, l?, f?) {
    this.loader = true;
    this.reportS.getTansactionList(p, l, f).subscribe(
      res => {
        // console.log(res);
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.transactions = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
  }

  filterList(e){
    this.filter = e;
    // console.log(e);
    this.getTansactionList(1, 20, this.filter);
  }

  detailtransaction(order) {
    // console.log(order);
    const modalStatus = this.modalService.open(OrderDialogBoxComponent, {
      size: 'lg'
    });
    modalStatus.componentInstance.order_id = order.order_id;
  }

}
