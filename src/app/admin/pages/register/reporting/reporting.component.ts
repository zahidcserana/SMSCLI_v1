import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service/register.service';
import { DetialsComponent } from './detials/detials.component';
import { RegisterList } from '../models/register-models';
import { downloadFile } from '../../../../globals/_classes/functions';
import { AlertService } from '../../../../modules/alert/alert.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  registerList: RegisterList[] = [];
  pagi: Pagi = new Pagi();
  loader: boolean;
  filter: string = '';
  stores: any[] = [];
  terminals: any[] = [];
  loaderExport: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private alertS: AlertService,
    private registerS: RegisterService
  ) {
    this.getTerminal();
   }

  ngOnInit() {
    this.getRegisterList(1, 20, '');
  }

  getTerminal() {
    this.registerS.getLoctionList().subscribe(
      res => {
        // console.log(res);
        if(res.status == 'OK') {
          this.stores = res.result.data.stores;
          this.terminals = res.result.data.terminals;
        }  
      }, err => {
        console.log(err);
      }
    );
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
    this.getRegisterList(e.page, e.limit, this.filter);
  }

  getRegisterList (p?, l?, f?) {
    this.loader = true;
    this.registerS.getRegisterList(p, l, f).subscribe(
      res => {
        // console.log(res);
        this.dataList(res);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  private dataList(res) {
    this.registerList = res.data;
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 20;
  }

  filterList(e){
    this.filter = e;
    // console.log(e);
    this.getRegisterList(1, 20, this.filter);
  }

  detailRegister(reg) {
    // console.log(reg);
    const modalStatus = this.modalService.open(DetialsComponent, {
      size: 'lg'
    });
    modalStatus.componentInstance.stores = this.stores;
    modalStatus.componentInstance.terminals = this.terminals;
    modalStatus.componentInstance.qData = {
      date: this.registerS.getCurrentDate(reg.date_closed)
    };
  }

  exportRegister() {
    this.loaderExport = true;
    const params = this.filter ? '?' + this.filter.slice(1) : '';
    // console.log(params);
    this.registerS.exportRegister(params).then(
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
