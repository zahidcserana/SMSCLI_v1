import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { AttributeSet, AttributManage } from "../product_models";
import { DialogBoxComponent } from "../../../../../modules/dialog-box/dialog-box.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { InventoryService } from "../../inventory-serveice/inventory.service";
import { AlertService } from "../../../../../modules/alert/alert.service";
import { ActivatedRoute } from "@angular/router";
import { Helpers } from "../../../../../helpers";
import { Subscription } from "rxjs";

declare let $: any;

@Component({
  selector: "product-sidebar-attribute",
  templateUrl: "./product-attribute.component.html",
  styleUrls: ["./product-attribute.component.css"]
})
export class ProductAttributeComponent implements OnInit, OnDestroy {
  attributeSet: AttributeSet[] = [];
  pro_id: number;
  loader: boolean;
  attLoader: boolean;
  attribute_id_list: any[] = [];
  filteredAttributes: AttributeSet[] = [];
  attributeChain: string;
  manageAttribut: AttributManage;
  edit: boolean;
  attributeList: AttributManage[] = [];
  location: any[] = [];
  sub: Subscription;
  preserveData = {};
  createNew: boolean;
  defaultWeight: boolean;

  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    private inventoryS: InventoryService,
    private alertS: AlertService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.getLocation();
    this.attLoader = true;
  }

  ngOnInit() {
    this.getAttributeSet();
    this.manageAttribut = new AttributManage();
    this.pro_id = parseInt(this.inventoryS.getProId(this.activeRoute));
    this.attribute_id_list = this.activeRoute.snapshot.data["list"].data;
    this.defaultWeight = this.activeRoute.snapshot.data["list"].is_default_weight;
    this.getAttributeList();

    $(".native-routing-container").scrollTop(0, 0);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    const url: string = this.activeRoute.snapshot["_routerState"].url;
    if (url.includes("details/edit")) {
      this.inventoryS.reload({
        reload: true,
        id: this.pro_id,
        from: "ATTRIBUTE",
        data: {
          data: this.attributeList,
          chain: this.attributeChain,
          filter: this.filteredAttributes
        }
      });
    }
  }

  // *******************************

  getAttributeSet() {
    this.inventoryS.getAtrributeSet().subscribe(
      res => {
        this.attributeSet = res.data;
        if (this.attribute_id_list.length < 1) {
          this.attribute_id_list = [];
        } else {
          this.formatAttributeSet();
        }
      },
      err => console.log(err)
    );
  }

  error(err, message) {
    this.loader = false;
    Helpers.setLoading(false);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }
  get unassign() {
    return this.attribute_id_list.includes(1);
  }
  // ****************************** Attribute list ****************************************

  formatAttributeSet() {
    this.filteredAttributes = [];
    for (let a of this.attribute_id_list) {
      const data = this.attributeSet.find(f => {
        return f.id == a;
      });
      if (data) {
        this.filteredAttributes.push(data);
      }
    }
    if (!(this.unassign && this.edit && this.attributeList[0])) {
      this.manageAttribute();
    }
  }

  addNewVariantValue() {
    this.createNew = true;
    this.edit = false;
    this.manageAttribute();
  }

  getAttributeList() {
    this.inventoryS.getAttributeList(this.pro_id).subscribe(
      res => {
        this.attLoader = false;
        if (res.status == "OK") {
          this.attributeList = res.result.data;
          if (this.unassign && this.attributeList[0]) {
            this.editAttribute(this.attributeList[0]);
          }
        } else {
          this.attributeList = [];
        }
        if (this.attributeList.length < 1) {
          this.createNew = true;
        }
      },
      err => {
        this.attLoader = false;
        this.attributeList = [];
        this.error(err, "Something wrong!!!");
      }
    );
  }

  getLocation() {
    this.inventoryS.getLocation().subscribe(
      res => {
        this.location = res.data;
        this.formatQty();
      },
      err => {
        this.location = [];
        this.formatQty();
        this.error(err, "Something wrong!!!");
      }
    );
  }

  formatQty() {
    this.manageAttribut.location = this.location.map(m => {
      if (this.unassign && this.edit && this.attributeList[0]) {
        const d = this.attributeList[0].location.find(
          f => f["location"] === m.id
        );
        if (d) {
          m["quantity"] = d["quantity"];
        }
      } else {
        m["quantity"] = 0;
      }

      return m;
    });
  }

  findAttribute(id) {
    return this.filteredAttributes.find(f => f.id == id).variants;
  }

  cancel() {
    this.manageAttribute();
    this.edit = false;
    this.createNew = false;
  }

  // ******************* Create variant value********************

  changedVariantValue(e, id) {
    const index = this.manageAttribut.attribute_set.findIndex(f => f.id == id);
    if (e.id != 0) {
      if (index > -1) {
        this.manageAttribut.attribute_set[index].a_id = e.id;
      }
    } else {
      this.manageAttribut.attribute_set[index].a_id = e.id;
      if (e.message) {
        this.alertS.error(this.alertContainer, e.message, true, 3000);
      }
    }
  }

  manageAttribute() {
    this.manageAttribut = new AttributManage();
    this.manageAttribut.default = false;
    this.formatQty();
    this.manageAttribut.attribute_set = this.filteredAttributes.map(a => {
      return { id: a.id, name: a.name, a_id: "NO" };
    });
  }

  addAttribute() {
    this.loader = true;
    const data = this.formatData(this.manageAttribut);
    this.inventoryS
      .addAttribute(this.pro_id, data)
      .then(res => {
        this.loader = false;
        if (res.status == "OK" && res.result.data.status) {
          this.alertS.success(
            this.alertContainer,
            "Variant value & quantity has been added.",
            true,
            5000
          );
          this.getAttributeList();
          this.cancel();
        } else {
          this.alertS.info(
            this.alertContainer,
            "Variant value has been already added.",
            true,
            5000
          );
        }
      })
      .catch(err =>
        this.error(err, "Something wrong! Variant value & quantity has been not added.")
      );
  }

  check() {
    return this.checkQty();
  }

  checkQty() {
    if(this.manageAttribut.location) {
      for (let q of this.manageAttribut.location) {
        if (q.quantity < 0) {
          return true;
        }
      }
    }
    return false;
  }

  getArrtibuteSet(id, list) {
    return list.find(f => id == f.variant_set_id).name;
  }

  editAttribute(data) {
    this.createNew = true;
    this.edit = true;
    this.manageAttribut = new AttributManage();
    this.manageAttribut = Object.assign({}, data);
    this.manageAttribut.location = this.location.map(m => {
      const d = data.location.find(f => f.location === m.id);
      if (d) {
        m["quantity"] = d["quantity"];
      } else {
        m["quantity"] = 0;
      }
      return m;
    });
    this.manageAttribut.default = data.default;
    this.manageAttribut.attribute_set = data.variant_set.map(a => {
      return { id: a.variant_set_id, name: a.variant_set_name, a_id: a.id };
    });
  }

  updateAttribute(f) {
    this.loader = true;
    const sendData = this.formatData(this.manageAttribut);
    sendData["ids"] = this.manageAttribut.ids;

    this.inventoryS
      .updateAttribute(this.pro_id, sendData)
      .then(res => {
        this.loader = false;
        if (res.status == "OK" && res.result.data.status) {
          this.getAttributeList();
          this.alertS.success(
            this.alertContainer,
            "Variant value & quantity has been updated.",
            true,
            5000
          );
          this.cancel();
        } else {
          this.alertS.info(
            this.alertContainer,
            "Duplicate variant value found.",
            true,
            5000
          );
        }
      })
      .catch(err =>
        this.error(err, "Something wrong! Variant value & quantity has been not updated.")
      );
  }

  removeAttribute(ids) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: "sm"
    });
    modalRef.componentInstance.massage = "Are you sure you want to delete?";
    modalRef.result.then(
      result => {
        if (result) {
          Helpers.setLoading(true);
          this.archiveAttribute(ids);
        }
      },
      res => console.log(res)
    );
  }

  archiveAttribute(ids) {
    this.inventoryS
      .deleteAttribute(this.pro_id, { ids: ids })
      .then(res => {
        this.edit = null;
        this.getAttributeList();
        this.alertS.success(
          this.alertContainer,
          "Variant value & quantity has been deleted.",
          true,
          5000
        );
        Helpers.setLoading(false);
        this.manageAttribute();
      })
      .catch(err =>
        this.error(err, "Something wrong! Variant value & quantity has been not deleted.")
      );
  }

  formatData(variant) {
    const data = JSON.parse(JSON.stringify(variant));
    return {
      barcode: data.barcode,
      variant_id: data.attribute_set.map(s =>
        typeof s.a_id === "string" ? parseInt(s.a_id) : s.a_id
      ),
      product_id: this.pro_id,
      set_id: data.attribute_set.map(s => s.id),
      location: data.location,
      default: data.default,
      weight_amount: data.weight_amount,
      weight_unit: data.weight_unit
    };
  }
}
