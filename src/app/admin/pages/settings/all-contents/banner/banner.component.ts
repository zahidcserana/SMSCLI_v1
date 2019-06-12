import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { EndPoint } from "../../../../../globals/endPoint/config";
import { Content } from "../../models/contents.model";
import { ContentService } from "../../setting-service/contents.service";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../../../modules/alert/alert.service";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"]
})
export class BannerComponent implements OnInit {
  textForm: FormGroup;
  loader: boolean;
  edit: boolean;
  config: Content = new Content();
  contents;
  banner = [];
  image = {
    url: EndPoint + "contents/upload-image",
    multi: true
  };
  bannerList = [];
  buttonText: string = "";
  addNewClicked: boolean;
  contentId: number;
  imageSize: string;
  types = {
    Page: [],
    Tag: [],
    Category: []
  };
  urlProduct = EndPoint + 'store-products';

  @ViewChild("hasCusAlert") alertContainer: ElementRef;
  constructor(
    private service: ContentService,
    private fb: FormBuilder,
    private alert: AlertService,
    private activeRoute: ActivatedRoute
  ) {
    this.getPages();
    this.getTags();
    this.getCategories();
    this.getContent();
  }

  ngOnInit() {}

  private getContent() {
    this.activeRoute.data.subscribe(val => {
      this.banner = val.content;
      if (this.banner[0]) {
        this.formatConfig(this.banner[0]);
      }
    });
    this.getContentList();
  }

  changeType(i) {
    const type = this.getType(i);
    if (!type) {
      this.setData(i, "link", "");
      this.setData(i, "content_id", "");
    }
  }

  productSelect(data, i) {
    this.setData(i, "content_id", data.id);
    this.setData(i, "link", 'product/' + data.uuid + '/' + data.url);
  }

  makeLink(e, i) {
    const id = e.id;
    this.setData(i, "content_id", id);
    const type = this.getType(i);
    const data = this.types[type].find(f => f.id == id);
    if (data) {
      this.makeUrlLink(type, data, i);
    } else {
      this.setData(i, "content_id", "");
      this.setData(i, "link", "");
    }
  }

  private makeUrlLink(type, data, i) {
    switch (type) {
      case "Tag":
        this.setData(i, "link", "tag/" + data.url);
        break;
      case "Category":
        this.getCategory(data, i);
        break;
      case "Page":
        let url;
        if (data.url === "contact") url = data.url;
        else if (data.url === "about") url = data.url;
        else if (data.url === "terms-and-conditions") url = data.url;
        else url = "page/" + data.url;
        this.setData(i, "link", url);
        break;
    }
  }

  async getCategory(data, i) {
    const cate = await this.service.getCatagory(data.id);
    if (cate) {
      let url = "category/" + cate.uuid + "/" + cate.url;
      this.setData(i, "link", url);
    } else {
      this.setData(i, "content_id", "");
    }
  }

  getType(i, type = "type") {
    return this.textArray.controls[i].get(type).value;
  }

  setData(i, name, value) {
    this.textArray.controls[i].get(name).setValue(value);
  }

  changeSelect() {
    const data = this.banner.find(f => f.id === this.config.tag);
    if (data) {
      this.formatConfig(data);
      this.findList();
    } else {
      this.config = new Content();
    }
  }

  private formatConfig(data) {
    this.config.tag = data.id;
    this.config.type = "banner";
    this.config.status = 1;
    this.config.multi = data.multi;
    this.image.multi = this.config.multi;
    this.buttonText = this.config.multi ? "Add More" : "Add New";
    this.imageSize = data["image_size"];
  }

  uploadImages(event) {
    if (event.status.status === "OK") {
      this.getContentList();
    } else {
      this.edit = false;
    }
  }

  private getContentList() {
    this.loader = true;
    this.service.getContents("banner").subscribe(res => {
      this.loader = false;
      this.bannerList = res;
      this.findList();
    });
  }

  private findList() {
    if (this.bannerList.length > 0) {
      const con = this.bannerList.find(f => f.config.tag === this.config.tag);
      if (con) {
        this.initForm();
        this.contentId = con.id;
        const data = con.contents;
        this.edit = true;
        this.addNewClicked = false;
        this.updateForm(data);
      } else {
        this.edit = false;
      }
    } else {
      this.edit = false;
    }
  }

  addNew() {
    this.edit = false;
    this.addNewClicked = true;
  }

  backToList() {
    this.addNewClicked = false;
    this.findList();
  }

  private getPages() {
    this.service.getPages().subscribe(res => {
      const result = res.filter(f => f.status === 1);
      this.types.Page = result.map(m => {
        m["url"] = m.slug;
        return m;
      });
      // console.log(this.types.Page);
    });
  }

  private getTags() {
    this.service.getTags().subscribe(res => {
      this.types.Tag = res;
    });
  }

  private getCategories() {
    this.service.getCategories().subscribe(res => {
      this.types.Category = this.service.formateCategories(res);
    });
  }

  //  ********************** Form*****************

  private initForm() {
    this.textForm = this.fb.group({
      contents: this.fb.array([this.initTextArray()])
    });
  }

  get textArray() {
    return this.textForm.get("contents") as FormArray;
  }

  private initTextArray() {
    return this.fb.group({
      text: "",
      id: "",
      url: "",
      label: "",
      link: "",
      btn_text: "",
      type: "",
      content_id: ""
    });
  }

  private updateForm(data) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (i !== 0) {
          this.textArray.push(this.initTextArray());
        }
        data[i].url = data[i].url.replace(/\//g, "/");
        this.textArray.controls[i].patchValue(data[i]);
      }
    } else {
      data.url = data.url.replace(/\//g, "/");
      this.textArray.controls[0].patchValue(data);
    }
  }

  save() {
    this.loader = true;
    const data = {
      config: this.config,
      contents: JSON.stringify(this.textArray.value)
    };
    this.service.addUpdate(data, this.contentId, this.edit).then(res => {
      this.loader = res.loader;
      this.allertShow(res.alert);
    });
  }

  deleteText(index) {
    this.textArray.removeAt(index);
  }

  allertShow(e) {
    this.getContentList();
    if (e.message) {
      if (e.status) {
        this.alert.success(this.alertContainer, e.message, true, 5000);
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }
}
