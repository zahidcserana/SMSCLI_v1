import { Component, OnInit, Input, Output, AfterViewInit, HostListener, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../../modules/http-with-injector/http.service';
import { StripeCheckoutLoader, StripeCheckoutHandler } from 'ng-stripe-checkout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';

@Component({
  selector: 'upgrade-subscription',
  templateUrl: './upgrade-subscription.component.html',
  styleUrls: ['./upgrade-subscription.component.css']
})
export class UpgradeSubscriptionComponent implements OnInit, AfterViewInit {
  stripeCheckoutHandler: StripeCheckoutHandler;
  @Input() planId: string;
  @Input() accountType: string;
  @Input() btnText = 'Upgrade';
  @Input() addCardMode = false;
  @Input() isNew: boolean;
  @Input() subscription: any;
  @Output() showAlert = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUpgrade = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onLoad = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private stripeCheckoutLoader: StripeCheckoutLoader,
    private http: HttpService,
    // public auth: AuthService,
  ) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.stripeCheckoutLoader.createHandler({
      // key: environment.stripeKey,
      key: 'pk_test_3u9uUnrRzDdipd4UaF9xOXEx',
      image: 'https://rentmy.co/wp-content/uploads/2017/12/icon.png',
      locale: 'auto',
      panelLabel: this.btnText,
      allowRememberMe: false,
      email: this.getEmail(),
      token: (token) => {
      }
    }).then((handler: StripeCheckoutHandler) => {
      this.stripeCheckoutHandler = handler;
    });
  }


  upgrade() {
    if ((this.planId && this.accountType) || this.addCardMode) {
      this.stripeCheckoutHandler.open({
        name: this.addCardMode ? 'Add New Card' : `${this.btnText} YOUR  PLAN`,
      }).then((token) => {
        if (this.addCardMode) {
          this.addCard(token.id);
        } else {
          this.upgradeMyPlan(token.id);
        }

      }).catch((err) => {
        // Payment failed or was canceled by user...
      });
    }
  }

  addCard(token) {
    this.http.post('subscription/add-card', { source: token }).toPromise()
      .then(res => {
        if (res.status === 'OK') {
          this.showAlert.emit({ res: true, message: res.result.message });
        } else {
          this.showAlert.emit({ res: false, message: res.result.error });
        }
        this.onLoad.emit(false);
      }).catch(err => {
        this.onLoad.emit(false);
        this.showAlert.emit({ res: false, message: 'Something Wrong Please try again !! ' });
      });
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.stripeCheckoutHandler.close();
  }
  upgradeMyPlan(token) {
    this.onLoad.emit(true);
    this.http.post('subscription/create', { plan_id: this.planId, source: token }).toPromise()
      .then(res => {
        if (res.status === 'OK') {
          this.showAlert.emit({ res: true, message: res.result.message });
          this.saveUserData();
          this.onUpgrade.emit(true);
        } else {
          this.showAlert.emit({ res: false, message: res.result.error });
        }
        this.onLoad.emit(false);
      }).catch(err => {
        this.onLoad.emit(false);
        this.showAlert.emit({ res: false, message: 'Something Wrong Please try again !! ' });
      });
  }


  openPopup() {
    if (this.isNew) {
      this.upgrade();
    } else {
      this.changePlan();
    }

  }


  changePlan() {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = `Are you sure you want to ${this.btnText}?`;
    modalRef.result.then(resp => {
      if (resp) {
        this.onLoad.emit(true);
        this.http.post('subscription/change-plan ', { plan_id: this.planId }).toPromise()
          .then(res => {
            if (res.status === 'OK') {
              this.onLoad.emit(false);
              this.showAlert.emit({ res: true, message: res.result.message });
              this.saveUserData();
              this.onUpgrade.emit(true);
            } else {
              this.onLoad.emit(false);
              this.showAlert.emit({ res: false, message: res.result.error });
            }
          });
      } else {

      }
    });
  }

  getEmail() {
    return JSON.parse(localStorage.getItem('currentUser')).email;
  }

  saveUserData() {
    this.subscription.account_type = this.accountType;
    this.subscription.card = true;
    const user_data = JSON.parse(localStorage.getItem('currentUser'));
    user_data.subscription = this.subscription;
    localStorage.setItem('currentUser', JSON.stringify(user_data));

  }
}
