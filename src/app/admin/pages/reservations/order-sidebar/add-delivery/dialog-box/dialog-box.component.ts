import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'warn-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class WarningDialogBoxComponent {

  @Input('massage') massage:string;
  

  constructor(public activeModal: NgbActiveModal) { }




}
