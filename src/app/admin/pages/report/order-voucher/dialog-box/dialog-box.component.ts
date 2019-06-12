import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { product_image } from '../../../../../globals/endPoint/config';
import { ReportService } from '../../report.service/report.service';



@Component({
  selector: 'delete-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class OrderDialogBoxComponent implements OnInit {

  @Input('order_id') order_id;
  imageUrl = product_image;
  productList;
  loader: boolean;

  constructor(public activeModal: NgbActiveModal, private reportS: ReportService){}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.loader = true;
    this.reportS.getProductList(this.order_id).subscribe(
      res => {
        this.productList = res.data;
        this.loader = false;
        // console.log(this.productList);
      },
      err => {console.log(err); this.loader = false;}
    );
  }

  getDate(d) {
    return this.reportS.formateListDate(d);
  }

  getType(d) {
    return d ? this.reportS.formateRentType(d) : '';
  }

  trackList(index, pro) {
    return pro ? pro.id : null;
  }

}
