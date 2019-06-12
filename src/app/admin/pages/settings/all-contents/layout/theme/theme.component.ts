import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ContentService } from "../../../setting-service/contents.service";
import { AlertService } from "../../../../../../modules/alert/alert.service";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagePopupComponent } from "../../../../../../modules/image-popup/image-popup.component";

@Component({
  selector: "app-theme",
  templateUrl: "./theme.component.html",
  styleUrls: ["./theme.component.css"]
})
export class ThemeComponent implements OnInit {
  colorForm: FormGroup;
  loader: boolean;
  layoutId = 0;
  sectionForm: FormGroup;
  layout = {
    layout_id: null,
    colorSettings: {},
    section: null
  };

  images = [];

  @ViewChild("hasCusAlert") alertContainer: ElementRef;

  constructor(
    private service: ContentService,
    private alert: AlertService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute
  ) {
    const data = activeRoute.snapshot.data.layout;
    this.layout = data ? data : this.layout;
  }

  ngOnInit() {
    this.images = this.service.images;
    this.sectionForm = this.initSection();
    this.colorForm = this.initColor();
    if (this.layout.layout_id !== null) {
      this.layoutId = this.layout.layout_id;
      this.formatlayout();
    }
  }

  private initColor() {
    return this.fb.group({
      primary_color: "",
      secondary_color: "",
      footer_background_color: "",
      footer_background_img: "",
      // theme_btn_background: "",
      // theme_btn_color: "",
      offer_background_color: "",
      theme_color: ""
    });
  }

  private initSection() {
    return this.fb.group({
      grid: false,
      featured_product: false,
      new_arrival: false,
      promotion: false
    });
  }

  resetBtn() {
    this.formatlayout();
  }

  getImages() {
    return this.images.find(
      f =>
        f.layout_id ===
        (typeof this.layoutId === "string"
          ? parseInt(this.layoutId, 10)
          : this.layoutId)
    ).images;
  }

  formatlayout() {
    this.layout.colorSettings = this.layout.colorSettings
      ? this.layout.colorSettings
      : this.service.layoutColors.find(
          f =>
            f.layout_id ===
            (typeof this.layoutId === "string"
              ? parseInt(this.layoutId, 10)
              : this.layoutId)
        ).colorSettings;
    this.colorForm.patchValue(this.layout.colorSettings);
    this.sectionForm.patchValue(this.layout.section);
  }

  getLayout() {
    this.service.getLayout().subscribe(res => {
      this.layout = res;
      this.layoutId = this.layout.layout_id;
      this.formatlayout();
    });
  }

  showBigImage(img) {
    const modalImage = this.modalService.open(ImagePopupComponent, {
      centered: true
    });
    modalImage.componentInstance.image = img;
  }

  changeLayout() {
    if (
      this.layout.layout_id ===
      (typeof this.layoutId === "string"
        ? parseInt(this.layoutId, 10)
        : this.layoutId)
    ) {
      this.formatlayout();
    } else {
      this.updateForm();
    }
  }

  updateForm() {
    const data = this.service.layoutColors.find(
      f =>
        f.layout_id ===
        (typeof this.layoutId === "string"
          ? parseInt(this.layoutId, 10)
          : this.layoutId)
    );
    this.colorForm.patchValue(data.colorSettings);
    this.sectionForm.patchValue(data.section);
  }

  saveColor() {
    this.loader = true;
    const layout = {
      colorSettings: this.colorForm.value,
      layout_id: this.layoutId,
      section: this.sectionForm.value
    };
    this.service
      .addLayout({ layout: layout })
      .then(res => {
        this.loader = false;
        if (res.status === "OK") {
          this.getLayout();
          this.alert.success(
            this.alertContainer,
            "Layout have been selected for your store.",
            true,
            3000
          );
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 3000);
        }
      })
      .catch(err => {
        this.loader = false;
        this.alert.error(
          this.alertContainer,
          "Something went wrong!!!",
          true,
          3000
        );
      });
  }
}
