import { Component, OnInit } from '@angular/core';
import { BillingInfo } from '../models/pricing-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css']
})
export class BillingInfoComponent implements OnInit {
  titles = [
    'Date',
    'Transaction Id',
    'Description',
    'Amount',
    'Status',
    ''
  ];
  billings: BillingInfo[] = [];
  constructor(private route: ActivatedRoute) {
    this.billings = this.route.snapshot.data.payment_history;
  }

  ngOnInit() {
  }


  getTransactionId(id: String) {
    return id.substring(4);
  }
}
