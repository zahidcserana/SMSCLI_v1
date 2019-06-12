import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SettingService } from "../../setting-service/setting.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DialogBoxComponent } from "../../../../../modules/dialog-box/dialog-box.component";

interface Zone {
  id?: number;
  zone: string;
  delivery_fee: number;
}

@Component({
  selector: "app-zone-settings",
  templateUrl: "./zone-settings.component.html",
  styleUrls: ["../delivery.component.css"]
})
export class ZoneSettingsComponent implements OnInit {

  edit: boolean;
  loading: boolean;
  zoneForm: FormGroup;
  zoneList: Zone[] = [];
  zoneId: number;
  deleteId: number;

  @Output("alert") alert: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: SettingService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getList();
    this.zoneForm = this.fb.group(this.initForm());
  }

  getList() {
    this.service.getDeliveryZone().subscribe(res => {
      this.zoneList = res;
    });
  }

  private initForm() {
    return {
      delivery_city: ["", Validators.required],
      delivery_ammount: ["", Validators.required]
    };
  }

  submitForm() {
    this.loading = true;
    this.service
      .saveDeliveryZone(this.zoneForm.value, this.zoneId)
      .then(res => {
        this.loading = false;
        if (res.status === "OK" && res.result.message) {
          this.getList();
          this.resetForm();
          this.alert.emit({ type: "success", message: res.result.message });
        } else {
          this.alert.emit({ type: "error", message: res.result.error });
        }
      })
      .catch(err => {
        this.loading = false;
        this.alert.emit({
          type: "error",
          message: "Someting went wrong!!! Please try again."
        });
      });
  }

  editZone(zone) {
    this.edit = true;
    this.zoneId = zone.id;
    this.zoneForm.patchValue(zone);
  }

  resetForm() {
    this.edit = false;
    this.zoneForm.reset();
    this.zoneId = null;
  }

  deleteZone(id, i) {
    this.resetForm();
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: "sm",
      windowClass: "animated fadeIn"
    });
    modalRef.componentInstance.massage = "Are you sure you want to delete?";
    modalRef.result.then(
      result => {
        if (result) {
          this.deleteId = id;
          this.archiveZone(id, i);
        }
      },
      res => {
        console.log(res);
      }
    );
  }

  archiveZone(id, i) {
    this.service.deleteDeliveryZone(id).then(
      res => {
        this.deleteId = null;
        if (res.status === "OK" && res.result.message) {
          this.zoneList.splice(i, 1);
          this.alert.emit({ type: "success", message: res.result.message });
        } else {
          this.alert.emit({ type: "error", message: res.result.error });
        }
      }
    ).catch (
      err => {
        this.deleteId = null;
        this.alert.emit({
          type: "error",
          message: "Someting went wrong!!! Please try again."
        });
      }
    )
  }

}
