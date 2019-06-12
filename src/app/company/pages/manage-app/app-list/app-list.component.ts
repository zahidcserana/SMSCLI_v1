import { DialogBoxComponent } from './../../../../modules/dialog-box/dialog-box.component';
import { AlertService } from './../../../../modules/alert/alert.service';
import { Pagi } from './../../../../modules/pagination/pagi.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { App } from '../models/company-app.model';
import { CompanyAppService } from '../company-app.service/company-app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  apps: App[] = [];
  loader: boolean;
  pagi: Pagi = new Pagi();
  deleteId: number;
  copiedId: number;

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private appS: CompanyAppService,
    private modalService: NgbModal,
    private alertS: AlertService
  ) {
    this.getStoreList(1, 20);
   }

  ngOnInit() {

  }

  trackStore(index, store) {
    return store? (store.id ? store.id : null) : null;
  }

  getStoreList(p?, l?) {
    this.loader = true;
    this.appS.getApps(p, l).subscribe(
      res => {
        this.loader = false;
        if(res.status == 'OK') {
          this.dataRender(res.result);
        } else {
          this.apps = [];
        }
      },
      err => {
        this.loader = false;
        console.log(err);
        this.apps = [];
      }
    );
  }

  dataRender(res) {
    this.apps = res.data;
    console.log(this.apps);
    this.pagi.page = parseInt(res.page_no);
    this.pagi.limit = parseInt(res.limit);
    this.pagi.total = parseInt(res.total);
  }

  reloadTable(p) {
    this.getStoreList(p.page, p.limit);
  }

  deleteDialog(message){
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = message;
    return modalRef.result;
  }

  deleteApp(id){
    this.deleteDialog('Are you sure you want to archive?')
    .then((result)=>{
      if(result){
        this.archiveApp(id);
      }
    },(res)=>{
      console.log(res);
    });
  }

  archiveApp(id){
    this.deleteId = id;
    this.appS.archiveApp(id)
    .then(
      res=>{
          if(res.status === 'OK') {
            this.alertS.success(this.alertContainer, res.result.message, true, 5000);   
            this.getStoreList(this.pagi.page, this.pagi.limit);
          } else {
            this.alertS.error(this.alertContainer,res.result.error, true, 5000);
          }
          this.deleteId = null;
      },
      err=>{
        console.log(err);
        this.deleteId = null;
        this.alertS.error(this.alertContainer,'Something worng!!! Please try again', true, 5000);
      }
    );
  }

  openSecret(id, icon) {
    $('#' + id).toggleClass('dis-block');
    $('#' + icon).toggleClass('fa-minus');
  }

  copySecret(copyText, id) {
    copyText.select();
    document.execCommand('copy');
    this.copiedId = id;
    setTimeout(() => {
      this.copiedId = null;
    }, 3000);
  }

}
