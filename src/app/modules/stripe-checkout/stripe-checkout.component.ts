import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { validateCard, monthsArray, createYearArray } from '../../globals/_classes/functions';

declare var Stripe: any;

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})
export class StripeCheckoutComponent implements OnInit {

  @Input('btnColor') btnColor;
  @Input('loader') loader;
  @Input('loaderColor') loaderColor;
  @Input() contents: any;
  @Input('key') key;
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
    private fb: FormBuilder
    ) {
    this.form = this.fb.group({
      cardNo: ['', Validators.required],
      cvcNo: ['', Validators.required],
      cardHolderName: ['', Validators.required]
    });
    this.checkCVC();
    this.checkCard();
  }

  ngOnInit() {
    this.btnColor = this.btnColor ? this.btnColor : 'btn-orange';
    this.loaderColor = this.loaderColor ? this.loaderColor : 'm-loader--orange';
    this.loadExternalScript().then(res => {
      Stripe.setPublishableKey(this.key);
    }).catch(err => {
      console.log(err);
    });
  }

  private loadExternalScript() {
    // tslint:disable-next-line:no-unused-expression
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://js.stripe.com/v2/';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }


  submitStripe() {
    this.loader = true;
    Stripe.card.createToken({
      number: this.cardNo,
      exp_month: this.expireMonth,
      exp_year: this.expireYear,
      cvc: this.cvcNo
    }, (status: number, response: any) => {
      if (status === 200) {
        this.paymentInfo['payment_gateway_name'] = 'Stripe';
        this.expireMonth = this.expireMonth ? this.expireMonth : this.months[0].value;
        this.expireYear = this.expireYear ? this.expireYear : this.years[0].value;
        this.paymentInfo['account'] = response.id;
        this.onSelectPayment.emit(this.paymentInfo);
      } else {
        console.log(response);
      }
    });
  }

  private checkCVC() {
    this.form.get('cvcNo').valueChanges.pipe(debounceTime(500)).subscribe(res => {
      this.cvcNo = this.form.get('cvcNo').value;
    });
    //   this.cvcNo = this.cvcNo.replace(/[^\d]+/g, '');
  }
  checkCard() {
    this.form.get('cardNo').valueChanges.pipe(debounceTime(500)).subscribe(data => {
      const cardNo = data;
      const res = validateCard(cardNo.replace(/[^\d]+/g, ''));
      if (res.status) {
        this.cardNo = this.form.get('cardNo').value;
        this.validCard = res.status;
        this.cardTypeimg = res.cardImg;
        this.cardName = res.cardName;
      }
    });
  }


  selectExpireMonth(e) {
    this.expireMonth = e.target.value;
  }
  selectExpireYear(e) {
    this.expireYear = e.target.value;
  }
}
