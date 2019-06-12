import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {Supplier, Descriptuion, Classes, Sections} from "../product-models/inventory.models";
import { InventoryService } from "../inventory-serveice/inventory.service";
import { AlertService } from "../../../../modules/alert/alert.service";

declare let $: any;

@Component({
  selector: "admin-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements AfterViewInit {
  classes: Classes[] = [];
  sections: Sections[] = [];
  product: Descriptuion = new Descriptuion();
  loader: boolean = false;
  currentYear: number;
  showVar: boolean;

  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertS: AlertService,
    private inventoryS: InventoryService
  ) {
  }

  ngOnInit() {
    this.getClasses();
    this.getYears();
  }
    getYears(){
      this.product.batch = (new Date).getFullYear();
    }
    getClasses() {
        this.inventoryS.getClasses().subscribe(res => {
            this.classes = res.data;
        });
    }
    getSectionByClass(class_id) {
        this.inventoryS.getSectionByClass(class_id).subscribe(res => {
            this.sections = res.data;
        });
    }

  ngAfterViewInit() {
  }


  changed(e: any): void {
    if (e.messag) {
      this.alertS.error(this.alertContainer, e.message, true, 3000);
    } else {
      this.product.class_id = parseInt(e.id);
        this.getSectionByClass(this.product.class_id);
        $("#section_div").show();
    }
  }
  sectionChanged(e: any): void {
        if (e.messag) {
            this.alertS.error(this.alertContainer, e.message, true, 3000);
        } else {
            this.product.section_id = parseInt(e.id);
        }
    }

  addProduct(f) {
    console.log(this.product);
    console.log('class');
    this.loader = true;
    this.product.status = 1;

    this.inventoryS
      .addProduct(this.product)
      .then(res => {
        this.loader = false;
        this.router.navigate([
          "admin/inventory/edit/" + res.result.data.id + "/description"
        ]);
      })
      .catch(err => {
        console.log(err.error.result.error);
        this.loader = false;
        this.alertS.error(
          this.alertContainer,
          "Someting wrong! Student has been not added",
          true,
          5000
        );
      });
  }
}
