import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpService } from "../../../../modules/http-with-injector/http.service";
import { map, catchError } from "rxjs/operators";

declare let $: any;

@Injectable()
export class OrderReceiptService {
  constructor(private http: HttpService) {}

  getTemplateData(type) {
    return this.http.get('templates/' + type).pipe( map (m => m.result.data), catchError( e => of(null)));
  }

  saveTemplateData(data) {
    return this.http.post('templates', data).toPromise();
  }

}

export class PDF {
  logo: string;
  general: string;
  store_address: string;
  terms_conditions: string = '';
  type: number;
  message_1: string = '';
  message_2: string = '';
}

export const staticData = {
  head: [
    "Item Description",
    "Rental Start Date",
    "Rental End Date",
    "Unit Price",
    "Qty",
    "Sales Tax",
    "Deposited Amount",
    "Sub Total"
  ],
  body: [
    {
      name: "Product 1",
      start: "01/11/2019",
      end: "01/18/2019",
      unit: "$10.00",
      qty: "4",
      tax: "$2.00(7.5%)",
      depo: "$5.00",
      sub: "$68.00"
    },
    {
      name: "Product 2",
      start: "01/11/2019",
      end: "01/13/2019",
      unit: "$15.00",
      qty: "2",
      tax: "$2.50(7.5%)",
      depo: "$0.00",
      sub: "$35.00"
    },
    {
      name: "Product 3",
      start: "01/12/2019",
      end: "01/15/2019",
      unit: "$20.00",
      qty: "3",
      tax: "$3.50(7.5%)",
      depo: "$5.00",
      sub: "$85.50"
    }
  ],
  others: [
    { label: "Sub Total", amount: "$188.50" },
    { label: "Shipping Charge", amount: "$00.00" },
    { label: "Discount", amount: "$00.00" },
    { label: "Sales Tax", amount: "$8.00" },
    { label: "Deposited Amount", amount: "$10.00" },
    { label: "Total", amount: "$188.50" }
  ]
};

export const general = `<div style="padding: 20px">
<p style="margin:0px">Receipt | No: {{order.order_id}}</p>
<p style="margin:0px">Customer Name: {{customer.name}}</p>
<p style="margin:0px">Email: {{customer.email}}</p>
<p style="margin:0px">Contact Number: {{customer.mobile}}</p>
<p style="margin:0px">Address: {{customer.address}}</p>
<p style="margin:0px">Order Date: {{order.date}}</p>
<p style="margin:0px">Order Status: {{order.status}}</p>
<p style="margin:0px">Pickup Location: {{order.pickup}}</p>
</div>`;

export const store_address = `<div style="padding: 20px">
<p style="margin:0px; text-align: right;">{{store.name}}</p>
<p style="margin:0px; text-align: right;">{{store.address}}</p>
</div>`;

export const pdfvariables = [
  {label: 'Order ID', value: '{{order.order_id}}'},
  {label: 'Customer Name', value: '{{customer.name}}'},
  {label: 'Customer Email', value: '{{customer.email}}'},
  {label: 'Customer Contact Number', value: '{{customer.mobile}}'},
  {label: 'Customer Address', value: '{{customer.address}}'},
  {label: 'Order Date', value: '{{order.date}}'},
  {label: 'Order Status', value: '{{order.status}}'},
  {label: 'Order Pickup location', value: '{{order.pickup}}'},
  {label: 'Store Name', value: '{{store.name}}'},
  {label: 'Store Address', value: '{{store.address}}'}
];

export const pdfvariablesValue = [
  {value: '50', name: '{{order.order_id}}'},
  {value: 'Jhon Deo', name: '{{customer.name}}'},
  {value: 'jhondeo@gmail.com', name: '{{customer.email}}'},
  {value: '+123456789', name: '{{customer.mobile}}'},
  {value: '250 Joralemon Street, Brooklyn, NY', name: '{{customer.address}}'},
  {value: '01/30/2019, 09:15 PM', name: '{{order.date}}'},
  {value: 'Paid', name: '{{order.status}}'},
  {value: 'Brooklyn, NY', name: '{{order.pickup}}'},
  {value: 'My Store', name: '{{store.name}}'},
  {value: 'New York', name: '{{store.address}}'}
];


