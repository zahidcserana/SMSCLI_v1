import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GET_USER } from '../../../../../globals/_classes/functions';
import { Router } from '@angular/router';
import { OrderReceiptService, staticData, store_address, general, pdfvariables, PDF } from '../../setting-service/orderReceipt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewDialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AlertService } from '../../../../../modules/alert/alert.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  staticData = staticData;
  pdf: PDF = new PDF();
  loading: boolean;
  pdfvariables = pdfvariables;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alertS: AlertService,
    private router: Router,
    private modalService: NgbModal,
    private service: OrderReceiptService
  ) { 
    this.pdf.type = 1;
    this.getPdf();
  }

  ngOnInit() {
    this.initPdf();
  }

  private initPdf() {
    this.pdf.general = general;
    this.pdf.store_address = store_address;
    this.showLogo();
  }

  getPdf() {
    this.service.getTemplateData(this.pdf.type).subscribe(
      res => {
        if(res) {
          this.pdf = res;
        } else {
          this.pdf = new PDF();
          this.pdf.type = 1;
          this.initPdf();
        }
      }
    );
  }

  changeLogo() {
    this.router.navigateByUrl('/admin/settings/contents/store-logo');
  }

  doNotShow() {
    this.pdf.logo = null;
  }

  showLogo() {
    this.pdf.logo = GET_USER().logo;
  }

  submit() {
    this.loading = true;
    this.service.saveTemplateData(this.pdf)
    .then(
      res => {
        this.loading = false;
        if(res.status === 'OK' && res.result.message) {
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
        } else {
          this.alertS.error(this.alertContainer, res.result.error, true, 3000);
        }
      }
    )
    .catch(
      err => {
        console.error(err);
        this.loading = false;
        this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
      }
    )
  }

  preview() {
    const modalStatus = this.modalService.open(PreviewDialogBoxComponent, {
      centered: true,
      size: 'lg'
    });
    modalStatus.componentInstance.pdf = this.pdf;
    modalStatus.componentInstance.table = this.staticData;
    modalStatus.result;
  }

}
