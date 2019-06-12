import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { AdminService } from '../../../../admin.service';
import { GET_USER, changeUser } from '../../../../../globals/_classes/functions';
import { EndPoint } from '../../../../../globals/endPoint/config';

@Component({
  selector: 'app-store-logo',
  templateUrl: './store-logo.component.html',
  styleUrls: ['./store-logo.component.css']
})
export class StoreLogoComponent implements OnInit {

  logo: string;
  tempLogo: string;
  url:string;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alert: AlertService,
    private adminS:AdminService
  ) { 
    this.url = EndPoint + 'stores/'+ GET_USER().store_id + '/store-logo';
    this.logo = GET_USER().logo;
  }

  ngOnInit() {}

  uploadLogo(data){
    console.log(data);
    this.logo = data.status.result.logo;
    changeUser('logo', this.logo);
    this.adminS.changeUser(GET_USER());
    this.tempLogo = null;
    this.alert.success(this.alertContainer, data.status.result.message, true, 3000);
  }

  changeLogo() {
    this.tempLogo = this.logo;
    this.logo = null;
  }

  cancelUpload() {
    this.logo = this.tempLogo;
    this.tempLogo = null;
  }
}
