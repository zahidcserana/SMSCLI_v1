import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, Renderer } from '@angular/core';
import { BillingDetails } from '../models/pricing-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billing-invoices',
  templateUrl: './billing-invoices.component.html',
  styleUrls: ['./billing-invoices.component.css']
})
export class BillingInvoicesComponent implements OnInit, AfterViewInit {
  details: BillingDetails;
  userData;
  constructor(
    private renderer: Renderer,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {

    this.details = this.route.snapshot.data.invoice_details;
    this.details.period_start = this.formatDate(this.details.period_start);
    this.details.period_end = this.formatDate(this.details.period_end);
    this.details.date = this.formatDate(this.details.date);
  }

  ngOnInit() {
    this.getUserInfo();
  }
  formatDate(date) {
    return new Date(Number(date) * 1000).toString();
  }
  getUserInfo() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngAfterViewInit() {
    const a = document.querySelector('.dwn-btn');
    this.renderer.setElementAttribute(a, 'href', this.details.invoice_pdf);

  }

}
