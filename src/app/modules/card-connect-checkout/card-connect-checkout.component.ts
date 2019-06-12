import {
  Component, OnInit, Output, EventEmitter,
   OnDestroy, Input, AfterContentInit, HostListener
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { iframe, monthsArray, createYearArray } from '../../globals/_classes/functions';


@Component({
  selector: 'app-card-connect-checkout',
  templateUrl: './card-connect-checkout.component.html',
  styleUrls: ['./card-connect-checkout.component.css']
})
export class CardConnectCheckoutComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input('btnColor') btnColor: string;
  @Input('loader') loader: boolean;
  @Input('loaderColor') loaderColor: string;
  @Input('contents') contents: any;
  @Output('onSelectPayment') onSelectPayment = new EventEmitter();

  validCard = false;
  cardTypeimg = '';
  cardNo: string;
  cvcNo = '';
  cardName: string;
  expireMonth: any;
  expireYear: any;
  sub: Subscription;
  token: number;
  paymentInfo = new Object();
  months = monthsArray;
  years = createYearArray();
  
  @HostListener('window:message', ['$event'])
  onMassage(event) {
    if (event && event.origin === 'https://fts.cardconnect.com:8443') {
      this.token = JSON.parse(event.data).message;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.token = null;
    iframe('cardName', '.iFram');
  }
  constructor() {}

  ngOnInit() {
    this.btnColor = this.btnColor ? this.btnColor : 'btn-orange';
    this.loaderColor = this.loaderColor ? this.loaderColor : 'm-loader--orange';
  }
  checkCVC() {
    if (this.cvcNo) {
      this.cvcNo = this.cvcNo.replace(/[^\d]+/g, '');
    }
  }
  submitCardConnect(form: NgForm) {
    this.loader = true;
    this.paymentInfo['payment_gateway_name'] = 'CardConnect';
    this.expireMonth = this.expireMonth ? this.expireMonth : this.months[0].value;
    this.expireYear = this.expireYear ? this.expireYear : this.years[0].value;
    this.paymentInfo['accttyppe'] = this.cardName;
    this.paymentInfo['account'] = this.token;
    this.paymentInfo['expiry'] = this.expireMonth + this.expireYear;
    this.paymentInfo['cvv2'] = form.value.cvcNo;
    this.onSelectPayment.emit(this.paymentInfo);
  }

  ngAfterContentInit() {
    iframe('cardName', '.iFram');
  }

  ngOnDestroy() {

  }

  selectExpireMonth(e) {
    this.expireMonth = e.target.value;
  }
  selectExpireYear(e) {
    this.expireYear = e.target.value;
  }

}
