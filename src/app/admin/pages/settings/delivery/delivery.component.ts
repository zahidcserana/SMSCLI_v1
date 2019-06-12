import {
  Component,
  OnInit,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { AlertService } from "../../../../modules/alert/alert.service";
import { SettingService } from "../setting-service/setting.service";
import { ZoneSettingsComponent } from "./zone-settings/zone-settings.component";
import { DistanceSettingsComponent } from "./distance-settings/distance-settings.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-delivery",
  templateUrl: "./delivery.component.html",
  styleUrls: ["./delivery.component.css"]
})
export class DeliveryComponent implements OnInit, OnDestroy {
  componentRef: ComponentRef<any>;
  settingForm: FormGroup;
  loading: boolean;
  sub: Subscription;

  @ViewChild("deliveryForm", { read: ViewContainerRef })
  deliveryForm: ViewContainerRef;
  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    private alertS: AlertService,
    private settingS: SettingService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.settingForm = this.fb.group({
      sales_tax: [false, Validators.required],
      is_requiered: [false, Validators.required],
      charge_by_zone: [false, Validators.required]
    });

    this.sub = this.activeRoute.data.subscribe(val => {
      const conditions = val.conditions;
      if (conditions) {
        this.settingForm.patchValue(conditions);
      }
      this.loadComponent();
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.sub.unsubscribe();
  }

  getValue(name) {
    return this.settingForm.get(name).value;
  }

  setValue(name, value) {
    return this.settingForm.get(name).setValue(value);
  }

  changeValue(e, name) {
    this.setValue(name, e);
    if (name === "charge_by_zone") this.loadComponent();
  }

  allertShow(e) {
    if (e.type) {
      if (e.type === "success") {
        this.alertS.success(this.alertContainer, e.message, true, 3000);
      } else {
        this.alertS.error(this.alertContainer, e.message, true, 3000);
      }
    }
  }

  loadComponent() {
    setTimeout(() => {
      if (this.settingForm.get("charge_by_zone").value) {
        this.createComponent(ZoneSettingsComponent);
      } else {
        this.createComponent(DistanceSettingsComponent);
      }
    }, 50);
  }

  private createComponent(comp) {
    const factory = this.resolver.resolveComponentFactory(comp);
    this.deliveryForm.clear();
    this.componentRef = this.deliveryForm.createComponent(factory);
    this.componentRef.instance.alert.subscribe(e => this.allertShow(e));
  }

  submitForm() {
    this.loading = true;
    this.settingS
      .saveDeliveryCondition(this.settingForm.value)
      .then(res => {
        this.loading = false;
        if (res.status === "OK" && res.result.message) {
          this.allertShow({ type: "success", message: res.result.message });
        } else {
          this.allertShow({ type: "error", message: res.result.error });
        }
      })
      .catch(err => {
        this.loading = false;
        console.error(err);
        this.allertShow({
          type: "error",
          message: "Something went wrong!!! Please try again."
        });
      });
  }
}
