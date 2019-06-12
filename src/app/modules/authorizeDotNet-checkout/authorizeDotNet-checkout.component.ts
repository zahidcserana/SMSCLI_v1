import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { validateCard, monthsArray, createYearArray, getBillingInfo } from '../../globals/_classes/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorizeDotNet-checkout',
  templateUrl: './authorizeDotNet-checkout.component.html',
  styleUrls: ['./authorizeDotNet-checkout.component.css']
})
export class AuthorizeDotNetCheckoutComponent implements OnInit {
  @Input('btnColor') btnColor;
  @Input('loader') loader;
  @Input('loaderColor') loaderColor;
  @Input() contents: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output('onSelectPayment') onSelectPayment = new EventEmitter();

  paymentInfo = new Object();
  form: FormGroup;
  cardTypeimg = './assets/img/home/credit-card/generic.png';
  cardNo: string;
  cvcNo = '';
  cardName: string;
  expireMonth: any;
  expireYear: any;
  validCard: boolean;
  months = monthsArray;
  years = createYearArray();
  
  constructor(
    private route: Router,
    private fb: FormBuilder
  ) {

    const data = getBillingInfo(route.url);

    this.form = this.fb.group({
      card_number: ['', Validators.required],
      cvv: ['', Validators.required],
      first_name: [data ? data.first_name : '', Validators.required],
      last_name: [data ? data.last_name : '', Validators.required],
      billing_address: [data ? data.address_line1 : '', Validators.required],
      billing_country: [''],
      billing_city: [data ? data.city : ''],
      billing_post_code: [data ? data.zipcode : ''],
      billing_state: [data ? data.state_id : '']
    });
    this.checkCVC();
    this.checkCard();
  }

  ngOnInit() {
    this.btnColor = this.btnColor ? this.btnColor : 'btn-orange';
    this.loaderColor = this.loaderColor ? this.loaderColor : 'm-loader--orange';
  }
  private checkCVC() {
    this.form.get('cvv').valueChanges.pipe(debounceTime(500)).subscribe(res => {
      this.cvcNo = this.form.get('cvv').value;
      this.cvcNo = this.cvcNo.replace(/[^\d]+/g, '');
    });
  }

  checkCard() {
    this.form.get('card_number').valueChanges.pipe(debounceTime(500)).subscribe(data => {
      const cardNo = data;
      const res = validateCard(cardNo.replace(/[^\d]+/g, ''));
      if (res.status) {
        this.cardNo = this.form.get('card_number').value;
        this.validCard = res.status;
        this.cardTypeimg = res.cardImg;
        this.cardName = res.cardName;
      }
    });
  }

  submitAuthorizeDotNet() {
    this.loader = true;
    Object.assign(this.paymentInfo, this.form.value);
    this.paymentInfo['expiry_month'] = this.expireMonth ? this.expireMonth : this.months[0].value;
    this.paymentInfo['expiry_year'] = this.expireYear ? this.expireYear : this.years[0].value;
    this.onSelectPayment.emit({card: this.paymentInfo, payment_gateway_name: 'AuthorizeDOTNET'});
  }

  selectExpireMonth(e) {
    this.expireMonth = e.target.value;
  }
  selectExpireYear(e) {
    this.expireYear = e.target.value;
  }
}
