import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service/order.service';


@Component({
  selector: 'delete-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class StatusDialogBoxComponent {

  @Input('orderStatus') orderStatus;
  @Input('status') status;

  constructor(public activeModal: NgbActiveModal){}



}
