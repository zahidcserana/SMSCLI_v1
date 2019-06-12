import { Component, Input, ViewEncapsulation, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  OrderReceiptService,
  pdfvariablesValue,
  PDF
} from "../../setting-service/orderReceipt.service";

@Component({
  selector: "pdf-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PreviewDialogBoxComponent implements OnInit {
  preview: PDF = new PDF();
  @Input("pdf") pdf;
  @Input("table") table;

  constructor(
    public activeModal: NgbActiveModal,
    private service: OrderReceiptService
  ) {}

  ngOnInit() {
    this.preview = JSON.parse(JSON.stringify(this.pdf));
    this.formatHtml();
  }

  formatHtml() {
    for (let v of pdfvariablesValue) {
      if (this.preview.general.includes(v.name))
        this.preview.general = this.preview.general.replace(v.name, v.value);
      if (this.preview.store_address.includes(v.name))
        this.preview.store_address = this.preview.store_address.replace(
          v.name,
          v.value
        );
    }
    this.preview.general = this.preview.general.replace(/\{\{[^\}]*\}\}/g, "");
    this.preview.store_address = this.preview.store_address.replace(
      /\{\{[^\}]*\}\}/g,
      ""
    );
  }
}
