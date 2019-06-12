import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Descriptuion, Classes, Sections} from "../../product-models/inventory.models";
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "../../inventory-serveice/inventory.service";
import { AlertService } from "../../../../../modules/alert/alert.service";
import { Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DialogBoxComponent } from "../../../../../modules/dialog-box/dialog-box.component";
declare let $: any;

@Component({
  selector: "product-sidebar-description",
  templateUrl: "./description.component.html",
  styleUrls: ["./description.component.css"]
})
export class DescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  classes: Classes[] = [];
  sections: Sections[] = [];
  product: Descriptuion = new Descriptuion();
  loader: boolean = false;
  sub: Subscription;
  loadSummary: boolean;
  pro_id: number;
  showVar: boolean;


  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private alertS: AlertService,
    private inventoryS: InventoryService
  ) {
  }

  ngOnInit() {
    this.pro_id = this.inventoryS.getProId(this.activeRoute);
    this.sub = this.activeRoute.data.subscribe(val => {
      this.product = val["description"].data;
      console.log(this.product.class_id);
      this.loadSummary = true;
      this.getSectionByClass(this.product.class_id);
    });
    $(".native-routing-container").scrollTop(0, 0);
    this.getClasses();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadDes() {
    const url: string = this.activeRoute.snapshot["_routerState"].url;
    if (url.includes("details/edit")) {
      const des = Object.assign({}, this.product);
      this.inventoryS.reload({
        reload: true,
        id: this.pro_id,
        from: "DESCRIPTION",
        data: des
      });
    }
  }

    getSectionByClass(class_id) {
      if(class_id==0){
          this.sections = [];
      }else{
          this.inventoryS.getSectionByClass(class_id).subscribe(res => {
              this.sections = res.data;
          });
      }
    }

    getSections() {
        this.inventoryS.getSections().subscribe(
            res => {
                this.sections = res.data;
                this.product.section_id = this.product.section_id
                    ? this.product.section_id
                    : 0;
            },
            err => console.log(err)
        );
  }

  getClasses() {
    this.inventoryS.getClasses().subscribe(
      res => {
        this.classes = res.data;
        this.product.class_id = this.product.class_id
          ? this.product.class_id
          : 0;
      },
      err => console.log(err)
    );
  }

  changed(e: any): void {
    if (e.messag) {
      this.alertS.error(this.alertContainer, e.message, true, 3000);
    } else {
      this.product.class_id = parseInt(e.id);
        this.getSectionByClass(this.product.class_id);
    }
  }

  sectionChanged(e: any): void {
    if (e.messag) {
      this.alertS.error(this.alertContainer, e.message, true, 3000);
    } else {
      this.product.section_id = parseInt(e.id);
    }
  }

  upadteProduct() {
    this.loader = true;
    this.inventoryS
      .updateProductDescription(this.product.id, this.product)
      .then(res => {
        this.loader = false;
        this.alertS.success(
          this.alertContainer,
          "Data have been successfully updated",
          true,
          5000
        );
        this.loadDes();
      })
      .catch(err => {
        console.log(err);
        this.loader = false;
        this.alertS.error(
          this.alertContainer,
          "Data have been not updated",
          true,
          5000
        );
      });
  }
}
