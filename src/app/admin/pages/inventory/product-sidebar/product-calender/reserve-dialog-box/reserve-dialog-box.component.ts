import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GET_USER } from '../../../../../../globals/_classes/functions';
import { HttpService } from '../../../../../../modules/http-with-injector/http.service';
import { AlertService } from '../../../../../../modules/alert/alert.service';

class Reserve {
  date: string;
  quantity: number;
  location: number;
  variants_products_id: number;
  product_id: number;
}

@Component({
  selector: 'reserve-dialog-box',
  templateUrl: './reserve-dialog-box.component.html',
  styleUrls: ['./reserve-dialog-box.component.css']
})
export class ReserveDialogBoxComponent implements OnInit {

  reserve: Reserve = new Reserve();
  loading: boolean;
  delLoad: boolean;

  @Input('event') event: any;
  @Input('edit') edit: any;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    public activeModal: NgbActiveModal, 
    private http: HttpService, 
    private alertS: AlertService
  ) { }

  ngOnInit() {
    this.reserve.date = this.event.product.date;
    this.reserve.location = GET_USER().location_id;
    this.reserve.product_id = this.event.product.id;
    this.reserve.variants_products_id = this.event.product.variant.variants_products_id;
    this.reserve.quantity = this.event.reserve ? this.event.reserve : this.event.qty;
  }

  get checkQty () {
    return this.reserve.quantity > this.event.reserve + this.event.qty || this.reserve.quantity < 1;
  }

  submit() {
    this.loading = true;
    this.http.post(`products-availabilities/add-unavailability`, this.reserve).subscribe(
      res => {
        this.loading = false;
        this.response(res);
      },
      err => {
        this.loading = false;
        this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
      }
    );
  }

  deleteReserve() {
    this.delLoad = true;
    delete this.reserve.quantity;
    this.http.post(`products-availabilities/remove`, this.reserve).subscribe(
      res => {
        this.delLoad = false;
        this.response(res);
      },
      err => {
        this.delLoad = false;
        this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
      }
    );
  }

  response(res) {
    if(res.status === 'OK') {
      if(res.result.message) {
        this.alertS.success(this.alertContainer, res.result.message, true, 2000);
        setTimeout(() => {
          this.activeModal.close(true);
        }, 2000);
      } else {
        this.alertS.error(this.alertContainer, res.result.error ? res.result.error : res.result.message, true, 3000);
      }
    } else {
      this.alertS.error(this.alertContainer, res.result.error ? res.result.error : res.result.message, true, 3000);
    }
  }

}
