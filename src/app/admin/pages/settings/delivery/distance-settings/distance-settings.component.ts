import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SettingService } from "../../setting-service/setting.service";
import { Stores } from "../../models/settings.models";
import { GET_USER } from "../../../../../globals/_classes/functions";

@Component({
  selector: "app-distance-settings",
  templateUrl: "./distance-settings.component.html",
  styleUrls: ["../delivery.component.css"]
})
export class DistanceSettingsComponent implements OnInit {

  loading: boolean;
  loader: boolean;
  distanceForm: FormGroup;
  locations: Stores[] = [];
  locationId: string = GET_USER().location_id;

  @Output("alert") alert: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private service: SettingService) {
    this.getLocation();
  }

  ngOnInit() {
    this.distanceForm = this.fb.group(this.initForm());
  }

  private initForm() {
    return {
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipcode: ["", Validators.required],
      country: ["", Validators.required],
      in_mile: [false, Validators.required],
      distance: ["", Validators.required],
      min_delivery_fee: ["", Validators.required],
      distance_price: ["", Validators.required]
    };
  }

  getLocation() {
    this.service.getterminals().subscribe(res => {
      this.locations = res.data.filter(m => m.status);
      this.getLocationData();
    });
  }

  get unit() {
    return this.distanceForm.get('in_mile').value;
  }

  getLocationData() {
    this.loader = true;
    this.service.getDeliveryDistance(this.locationId).subscribe(
      res => {
        if(res) {
          this.distanceForm.patchValue(res);
        } else {
          this.distanceForm.reset();
        }
        this.loader = false;
      }
    );
  }

  selectLocation() {
    this.getLocationData();
  }

  submitForm() {
    this.loading = true;
    this.service.saveDeliveryDistance(this.distanceForm.value, this.locationId)
    .then(
      res => {
        this.loading = false;
        if (res.status === "OK" && res.result.message) {
          this.alert.emit({ type: "success", message: res.result.message });
        } else {
          this.alert.emit({ type: "error", message: res.result.error });
        }
      }
    )
    .catch(
      err => {
        this.loading = false;
        this.alert.emit({
          type: "error",
          message: "Someting went wrong!!! Please try again."
        });
      }
    )
  }


}
