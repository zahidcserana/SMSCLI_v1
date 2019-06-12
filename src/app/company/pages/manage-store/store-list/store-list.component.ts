import { AlertService } from './../../../../modules/alert/alert.service';
import { DialogBoxComponent } from './../../../../modules/dialog-box/dialog-box.component';
import { domainName, storeHoshName } from './../../../../globals/endPoint/config';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '../models/store.model';
import { StoreService } from '../store.service/store.service';
import { Pagi } from '../../../../modules/pagination/pagi.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatStoreList } from '../../../../globals/_classes/functions';


@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  stores: Store[] = [];
  loader: boolean;
  pagi: Pagi = new Pagi();
  deleteId: number;
  hoshName: string = storeHoshName;

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private storeS: StoreService,
    private modalService: NgbModal,
    private alertS: AlertService,
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
    this.storeS.getStores(p, l).subscribe(
      res => {
        this.loader = false;
        if(res.status == 'OK') {
          this.dataRender(res.result);
        } else {
          this.stores = [];
        }
      },
      err => {
        this.loader = false;
        console.log(err);
        this.stores = [];
      }
    );
  }

  dataRender(res) {
    this.stores = formatStoreList(res.data);
    console.log(this.stores);
    this.pagi.page = parseInt(res.page_no);
    this.pagi.limit = parseInt(res.limit);
    this.pagi.total = parseInt(res.total);
  }

  reloadTable(p) {
    this.getStoreList(p.page, p.limit);
  }

  getDomain(store) {
    // const href = domainName(store, 'store') + '/admin/dashboard';
    const href = domainName(store.slug, 'store') + `/auth/store-login`;
    window.open(href);
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

  deleteStore(id){
    this.deleteDialog('Are you sure you want to archive?')
    .then((result)=>{
      if(result){
        this.archiveProduct(id);
      }
    },(res)=>{
      console.log(res);
    });
  }

  archiveProduct(id){
    this.deleteId = id;
    this.storeS.archiveStore(id)
    .then(
      res=>{
          if(res.status === 'OK') {
            this.alertS.success(this.alertContainer, res.result.message, true, 5000);   
            this.getStoreList(this.pagi.page, this.pagi.limit);
          } else {
            this.alertS.error(this.alertContainer,res.result.error, true, 5000);
          }
      },
      err=>{
        console.log(err);
        this.alertS.error(this.alertContainer,'Something worng!!! Please try again', true, 5000);
      }
    );
  }

}
