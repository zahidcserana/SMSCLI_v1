import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { storeHoshName, domainName } from '../../../../../../globals/endPoint/config';
import { PartnerUserService } from '../../../user.service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Store, User } from '../../../models/user.models';
import { eLogin, encrypt } from '../../../../../../globals/_classes/functions';


@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrls: ['./list-stores.component.css']
})
export class StoresListComponent implements OnInit {

  stores: Store[] = [];
  loader: boolean;
  deleteId: number;
  hoshName: string = storeHoshName;
  user_id:number;
  user: User = new User();

  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userS: PartnerUserService
  ) {
    this.user_id = +this.route.parent.parent.parent.parent.snapshot.paramMap.get('user_id');
   }

  ngOnInit() {
    this.userS.getuserProfileInfo(this.user_id).subscribe(
      res => {
        this.user = res.data;
      },
      err => {
        this.user = new User();
        console.log(err);
      }
    );

    this.getStoreList();
  }

  trackStore(index, store) {
    return store? (store.id ? store.id : null) : null;
  }

  getStoreList() {
    this.loader = true;
    this.userS.getStores(this.user_id).subscribe(
      res => {
        this.loader = false;
        if(res.status == 'OK') {
          this.stores = res.result.data;
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


  getDomain(store) {
    this.deleteId = store.id;
    this.userS.getLoginInfoForStore(store.id).subscribe(
      res => {
        this.deleteId = null;
        if(res.status === 'OK') {
          const a = eLogin(encrypt(encrypt(encrypt(JSON.stringify(res.result.data), 'upper'), 'lower')));
          const href = domainName(store.name, 'store') + `/admin/dashboard?user=${a}`;
          window.open(href);
        } else {
          
        }
      }, err => {
        this.deleteId = null;
        console.log(err);
      }
    );
   
  }


}
