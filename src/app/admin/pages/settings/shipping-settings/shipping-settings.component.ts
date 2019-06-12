import {
  Component,
  OnInit,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  ComponentFactoryResolver
} from "@angular/core";
import { Shipping } from "../models/settings.models";
import { AlertService } from "../../../../modules/alert/alert.service";
import { SettingService } from "../setting-service/setting.service";
import { SidebarService } from "../../sidebar-service/sidebar.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { MainFormComponent } from "./main-form/main-form.component";
import { DialogBoxComponent } from "../../../../modules/dialog-box/dialog-box.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { GET_USER } from "../../../../globals/_classes/functions";

@Component({
  selector: "app-shipping-settings",
  templateUrl: "./shipping-settings.component.html",
  styleUrls: ["./shipping-settings.component.css"]
})
export class ShippingSettingsComponent implements OnInit {
  loader: boolean;
  shippings = {
    fedex: null,
    ups: null,
    usps: null
  };
  sideBaropen: boolean;
  shippingObj;
  componentRef: ComponentRef<any>;
  deleteId: string;
  locations = [];
  inStoreLocation = GET_USER().location_id;

  @ViewChild("hasCusAlert") alertContainer: ElementRef;
  @ViewChild("addFormCard", { read: ViewContainerRef })
  cardForm: ViewContainerRef;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (this.sideBaropen) {
      $(".native-routing").css("display", "block");
      this.openSidebar();
    }
  }

  constructor(
    private alert: AlertService,
    private settingS: SettingService,
    private sidebarS: SidebarService,
    private modalService: NgbModal,
    private resolver: ComponentFactoryResolver
  ) {
    this.getLocationWithAddress();
  }

  ngOnInit() {
    this.getShippins();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.closeSidebar();
    this.executeAction();
  }

  getLocationWithAddress() {
    this.settingS.getLocationWithAddress().subscribe(
      res => {
        this.locations = res;
      }
    );
  }

  formatAddress (loc) {
    const {address, city, country, state, zipcode} = loc;
    return [address, city, country, state, zipcode].filter( f=> f).join(', ');
  }

  editCarrier(type) {
    const data = this.shippings[type];
    this.openSidebar({ edit: true, type: type, data: data });
  }

  addCarrier(type) {
    this.openSidebar({ edit: false, type: type });
  }

  openSidebar(data?) {
    let w =
      $(".global-sidebar-wrapper").width() +
      ($(window).width() > 992 ? 25 : 0) +
      "px";
    this.sideBaropen = true;
    $(".native-routing").css("display", "block");
    this.sidebarS.openSidebar(w);
    if (data) {
      this.settingS.editShippingForm.next(data);
      this.createComponent();
    }
  }

  closeSidebar() {
    $(".close-sidebar").click(e => {
      e.preventDefault();
      this.executeAction();
    });
    $(".close-sidebar-upper").click(e => {
      e.preventDefault();
      this.executeAction();
    });
  }

  executeAction() {
    this.sideBaropen = false;
    this.sidebarS.removeSidebar();
    $(".native-routing").css("display", "none");
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  allertShow(e) {
    if (e.message) {
      if (e.status) {
        this.alert.success(this.alertContainer, e.message, true, 5000);
        this.executeAction();
        this.getShippins();
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }

  getShippins() {
    this.loader = true;
    this.settingS
      .getShippings()
      .pipe(
        map(res => {
          return res.result.data;
        }),
        catchError(err => {
          this.loader = false;
          return of([]);
        })
      )
      .subscribe(res => {
        this.loader = false;
        for( const s of res) {
          const name = s.name.toLowerCase();
          if(name == 'fedex') {
            this.shippings.fedex = s;
          } else if(name == 'ups') {
            this.shippings.ups = s;
          } else {
            this.shippings.usps = s;
          }
        }
        console.log(this.shippings)
      });
    this.executeAction();
  }

  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(MainFormComponent);
    this.cardForm.clear();
    this.componentRef = this.cardForm.createComponent(factory);
    this.componentRef.instance.allertShow.subscribe(e => this.allertShow(e));
  }

  disconnectCarrier(type) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: "sm",
      windowClass: "animated fadeIn"
    });
    modalRef.componentInstance.massage = "Are you sure you want to delete?";
    modalRef.result.then(
      result => {
        if (result) {
          this.archiveCoupon(type);
        }
      },
      res => {
        console.log(res);
      }
    );
  }

  archiveCoupon(type) {
    const data = this.shippings[type];
    if (!data) return;
    this.deleteId = type;
    this.settingS
      .deleteShipping(data["carrier_id"])
      .then(res => {
        if (res.status === "OK" && res.result.message) {
          this.allertShow({ status: true, message: res.result.message });
        } else {
          this.allertShow({ status: false, message: res.result.error });
        }
        this.deleteId = null;
      })
      .catch(err => {
        console.log(err);
        this.deleteId = null;
        this.allertShow({
          status: false,
          message: "Something went wrong!!! Please try again."
        });
      });
  }

  addLocation(loc) {
    const modalRef = this.modalService.open(AddressModalComponent, {
      centered: true,
      size: "lg"
    });
    modalRef.componentInstance.locationId = loc.id;
    modalRef.result.then(
      result => {
        console.log(result);
      },
      res => {
        console.log(res);
      }
    );
  }
}
