import { Component, OnInit } from '@angular/core';
import { BillingInfo } from '../../models/user.models';

const Billings = [
  {
    transaction_id: '1516516121sad1561as',
    created: new Date().toLocaleString(),
    amount: 2000,
    charge_status: 'Monthly',
    seller_message: 'Seller Message...'
  },
  {
    transaction_id: '1516516121sad1561as',
    created: new Date().toLocaleString(),
    amount: 0,
    charge_status: 'Free',
    seller_message: 'Seller Message...'
  },
  {
    transaction_id: '1516516121sad1561as',
    created: new Date().toLocaleString(),
    amount: 5000,
    charge_status: 'Yearly',
    seller_message: 'Seller Message...'
  }
];

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit {

  titles = [
    'Date',
    'Transaction Id',
    'Description',
    'Amount',
    'Status'
  ];
  billings: BillingInfo[] = [];

  constructor() {}

  ngOnInit() {
    this.billings = Billings;
  }


  getTransactionId(id: String) {
    return id.substring(4);
  }

}
