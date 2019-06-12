import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { RegisterService } from '../../register.service/register.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { StoreInfo, Register, Denomination } from '../../models/register-models';
import { GET_USER } from '../../../../../globals/_classes/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

class CloseCalculation {
  openingAmount: number = 0;
  totalCalculate: number = 0;
  discrepancy: number = 0;
}


@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit, OnDestroy {
  
  loader:boolean = false;
  registerStore: StoreInfo = new StoreInfo();
  register: Register;
  user = GET_USER();
  sub: Subscription[] = [];
  close: boolean;
  edit: boolean;
  closeCal: CloseCalculation = new CloseCalculation();
  

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alertS: AlertService,
    private activeRoute: ActivatedRoute,
    private registerS: RegisterService
  ) { 
    const path = this.activeRoute.snapshot['_routerState'].url;
    this.close = path.includes('close');
    this.edit = path.includes('edit');
    if(this.edit) {
      this.register = new Register();
      this.formatForEdit();
    } else {
      this.initRegister();
      this.checkOpenClose();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.registerS.storeInfo.subscribe(
      val => {
        if(val) {
          this.registerStore = val;
        }
      }
    );
  }

  ngOnDestroy() {
    for(let s of this.sub) {
      s.unsubscribe();
    }
    sessionStorage.removeItem('regClose');
    sessionStorage.removeItem('regEdit');
    sessionStorage.removeItem('regOpen');
  }

  getSaleRefund(d) {
    const data = {
      date: d.date_opened ? this.registerS.getCurrentDateTime(d.date_opened) : this.registerS.getCurrentDateTime(),
      terminal_id: d.terminal_id
    };
    this.registerS.getSaleRefund(data).subscribe(
      res => {
        this.register.sales_amount = res.data.sales_amount;
        this.register.refund_amount = res.data.refund_amount;
        this.calculateSales();
      }, err => console.log(err)
    );
  }

  calculateSales() {
    this.closeCal.totalCalculate = this.closeCal.openingAmount + this.register.sales_amount - this.register.refund_amount;
    this.closeCal.discrepancy = this.register.total_amount - this.closeCal.totalCalculate;
  }

  private checkOpenClose() {
    if(this.close) {
      const data = JSON.parse(sessionStorage.getItem('regClose'));
      if(data) {
        this.register.id = data.id;
        this.closeCal.openingAmount = data.amount_open;
        this.getSaleRefund(data);
      }
    }
    this.formatOpenClose();
  }

  private formatOpenClose() {
    this.sub[0] = this.activeRoute.data.subscribe(
      val => {
        if(val) {
          const data = this.close ? val.denomination.close : val.denomination.open;
          this.register.denomination =  data.map((m: Denomination) => {
            if(m.label.includes('$')) {
              m.quantity = 1;
              m.base = m.value;
            }
            return m;
          });
          // console.log(this.register);
          this.getTotal();
        }
      }
    );
  }

  private formatForEdit() {
    const d = JSON.parse(sessionStorage.getItem('regEdit'));
    this.registerS.getEditData({register_report_id: d.id, type: 'open'}).subscribe(
      res => {
        // console.log(res);
        this.register = res.data;
        this.register.user_id = this.user.user_id;
        this.register.id = d.id;
        this.getTotal();
      }, err => this.error(err, 'Something wrong!!! Please try again')
    );
  }

  trackDeno(index, deno) {
    return deno ? deno.id : null;
  }

  private initRegister() {
    this.register = new Register();
    this.register.location_id = this.user.location_id;
    this.register.terminal_id = this.user.terminal_id;
    this.register.type = this.close ? 'close' : 'open';
    this.register.user_id = this.user.user_id;
  }

  getTotal() {
    this.register.total_amount = this.registerS.getTotal(this.register.denomination);
    this.calculateSales();
  }

  checkDoller(data) {
    if(data && (data.label.includes('$') || data.quantity)) return true;
    return false;
  }
  
  submitRegister() {
    this.loader = true;
    if(this.edit) {
      this.register.date = this.register.date ? this.registerS.getCurrentDateTime(this.register.date) : this.registerS.getCurrentDateTime();
      this.register['edit'] = this.edit;
      this.register['register_report_id'] = this.register.id;
    }
    if(this.close) {
      this.register['register_report_id'] = this.register.id;
    }
    // console.log(this.register);
    this.registerS.submitRegister(this.register).then(
      res => {
        // console.log(res);
        if(res.status == 'OK') {
          const massage = this.submitSuccess();
          this.registerS.sideBarOff.next({close: true, massage: massage});
        } else {
          this.submitError('');
        }
      }
    ).catch(
      err => this.submitError(err)
    );
  }

  error(err, massage) {
    this.loader = false;
    console.log(err);
    this.alertS.error(this.alertContainer, massage, true, 5000);
  }

  submitError(err) {
    let massage = ''
    if(this.edit) {
      massage = 'Register has not been updated';
    } else {
      massage = this.close ? 'Register has not been closed' : 'Register has not been created';
    }
    this.error(err, 'Something wrong!!! '+ massage);
  }

  submitSuccess() {
    if(this.edit) {
      return 'Register has been updated'
    } else {
      return this.close ? 'Register has been closed' : 'Register has been created';
    }
  }


}
