import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentGatewayResolveService } from '../../../home-service/gateway-resolve.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  stripeKey = ''
  @Output() onSelectPayment = new EventEmitter();
  @Input() contents: any;
  gateways = [];
  gateId = 0;
  gateName = '';

  constructor(
    private gateService: PaymentGatewayResolveService,
    private route: ActivatedRoute) {
    this.gateways = this.route.parent.snapshot.data.payment_gateways;

    if (this.gateways.length > 0) {
      this.gateId = this.gateways[0].id;
      this.gateName = this.gateways[0].name;
    }

  }

  ngOnInit() {
  }

  submit(event) {
    this.onSelectPayment.emit(event);
  }
  offLoader() {
    this.gateService.gatewayConfig.next({ offLoader: true });
  }


  changeGateWay(index) {
    this.gateId = this.gateways[index].id;
    this.gateName = this.gateways[index].name;
    if (this.gateName === 'Stripe') {
      this.stripeKey = this.gateways[index].config.publishable_key;
    }
  }

}
