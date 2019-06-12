import {
  Component,
  OnInit,
  ComponentRef,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";
import { Shipping } from "../../models/settings.models";
import { Subscription } from "rxjs";
import { SettingService } from "../../setting-service/setting.service";
import { UspsComponent } from "./usps/usps.component";
import { UpsComponent } from "./ups/ups.component";
import { FedexComponent } from "./fedex/fedex.component";

@Component({
  selector: "app-main-form",
  templateUrl: "./main-form.component.html",
  styleUrls: ['../shipping-settings.component.css']
})
export class MainFormComponent implements OnInit {
  shipping: Shipping = new Shipping();
  selectedMethod;
  sub: Subscription;
  componentRef: ComponentRef<any>;
  edit: boolean;
  id: number;

  @Output("allertShow") allertShow = new EventEmitter();
  @ViewChild("cardConect", { read: ViewContainerRef })
  cardConect: ViewContainerRef;

  constructor(
    private service: SettingService,
    private resolver: ComponentFactoryResolver
  ) {
    this.shipping = new Shipping();
  }

  ngOnInit() {
    this.sub = this.service.editShippingForm.subscribe(val => {
      this.edit = val.edit;
      if(this.edit) {
        this.shipping = val.data;
      } else {
        this.shipping = new Shipping();
        this.shipping.config = { ...this.shipping.config, api_key: ''}
      }
      this.id = this.shipping.id;
      this.loadComponent(val.type);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.componentRef.destroy();
  }

  private loadComponent(type) {
    switch (type) {
      case "ups":
        this.createComponent(UpsComponent);
        break;
      case "usps":
        this.createComponent(UspsComponent);
        break;
      default:
        this.createComponent(FedexComponent);
        break;
    }
  }

  private createComponent(comp) {
    const factory = this.resolver.resolveComponentFactory(comp);
    this.cardConect.clear();
    this.componentRef = this.cardConect.createComponent(factory);
    this.componentRef.instance.shipping = this.shipping;
    this.componentRef.instance.id = this.id;
    this.componentRef.instance.edit = this.edit;
    this.componentRef.instance.submit.subscribe(e => this.allertShow.emit(e));
  }
}
