import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PricingService } from '../pricing.service';
import { CreditCard } from '../models/pricing-models';
import { AlertService } from '../../../../modules/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from '../../../../helpers';

@Component({
  selector: 'app-subs-payment',
  templateUrl: './subs-payment.component.html',
  styleUrls: ['./subs-payment.component.css']
})
export class SubsPaymentComponent implements OnInit {
  loading: boolean;
  cards: CreditCard[] = [];
  preloader: boolean;
  isSubs: boolean;
  @ViewChild('alert') alertContainer: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private alert: AlertService,
    private service: PricingService) {
    this.cards = this.route.snapshot.data.cards;
    this.isSubs = this.cards.length ? true : false;
  }

  ngOnInit() {

  }

  getCards() {
    Helpers.setLoading(true);
    this.service.getCards().subscribe(res => {
      this.cards = res;
      Helpers.setLoading(false);
      this.isSubs = this.cards.length ? true : false;
    });
  }
  makePrimary(id) {
    Helpers.setLoading(true);
    this.service.makePrimary(id).then(res => {
      if (res.status === 'OK') {
        Helpers.setLoading(false);
        this.alert.success(this.alertContainer, res.result.message, true, 5000);
        this.getCards();
      } else {
        this.alert.success(this.alertContainer, res.result.error, true, 5000);
      }
    }).catch(err => {
      Helpers.setLoading(false);
      this.alert.success(this.alertContainer, 'Something Wrong Please try again !! ', true, 5000);
    });
  }

  deleteCard(id) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result.then(resp => {
      if (resp) {
        if (id) {
          Helpers.setLoading(true);
          this.service.deleteCard(id).then(res => {
            Helpers.setLoading(false);
            if (res.status === 'OK') {
              this.getCards();
              this.alert.success(this.alertContainer, res.result.message, true, 5000);
            } else {
              this.alert.error(this.alertContainer, res.result.message, true, 5000);
            }
          }).catch(err => {
            Helpers.setLoading(false);
            this.alert.error(this.alertContainer, 'Something Went wrong Please try again !!!', true, 5000);
          });
        }
      }
    });
  }
  onLoad(e) {
    if (e) {
      Helpers.setLoading(true);
    } else {
      Helpers.setLoading(false);
    }
  }
  onAlert(e) {
    if (e.res) {
      this.alert.success(this.alertContainer, e.message, false, 5000);
      this.getCards();
    } else {
      this.alert.error(this.alertContainer, e.message, false, 5000);
    }
  }
}
