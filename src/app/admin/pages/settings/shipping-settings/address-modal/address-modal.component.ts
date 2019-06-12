import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Stores } from "../../models/settings.models";
import { GET_USER } from "../../../../../globals/_classes/functions";
import { SettingService } from "../../setting-service/setting.service";
import { AlertService } from "../../../../../modules/alert/alert.service";

@Component({
  selector: "app-address-modal",
  templateUrl: "./address-modal.component.html",
  styleUrls: ["./address-modal.component.css"]
})
export class AddressModalComponent implements OnInit {
  loading: boolean;
  loader: boolean;
  distanceForm: FormGroup;
  @Input('locationId') locationId;
  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: SettingService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getLocationData();
    this.distanceForm = this.fb.group(this.initForm());
  }

  private initForm() {
    return {
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipcode: ["", Validators.required],
      country: ["", Validators.required],
      phone: ["", Validators.required]
    };
  }

  getLocationData() {
    this.loader = true;
    this.service.getDeliveryDistance(this.locationId).subscribe(res => {
      if (res) {
        this.distanceForm.patchValue(res);
      } else {
        this.distanceForm.reset();
      }
      this.loader = false;
    });
  }

  selectLocation() {
    this.getLocationData();
  }

  submitForm() {
    this.loading = true;
    this.service
      .saveDeliveryDistance(this.distanceForm.value, this.locationId)
      .then(res => {
        this.loading = false;
        if (res.status === "OK" && res.result.message) {
          this.alert.success(
            this.alertContainer,
            res.result.message,
            true,
            2000
          );
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 3000);
        }
      })
      .catch(err => {
        this.loading = false;
        this.alert.error(
          this.alertContainer,
          "Someting went wrong!!! Please try again.",
          true,
          3000
        );
      });
  }
}
