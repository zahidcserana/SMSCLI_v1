import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { EndPoint } from "../../../../../globals/endPoint/config";
import { Content } from "../../models/contents.model";
import { ContentService } from "../../setting-service/contents.service";
import { AlertService } from "../../../../../modules/alert/alert.service";
import { getOriginalUrl } from "../../../../../globals/_classes/functions";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit {
  textForm: FormGroup;
  loader: boolean;
  edit: boolean;
  config: Content = new Content();
  contents;
  image = {
    url: EndPoint + "contents/upload-image",
    multi: true
  };
  grid = [];
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
    private alert: AlertService,
    private fb: FormBuilder
  ) {
    this.getPages();
    this.getTags();
    this.getCategories();
    this.getContentList();
  }

  ngOnInit() {
    this.config.tag = "grid";
    this.config.type = "grid";
    this.config.status = 1;
    this.config.multi = this.image.multi;
    this.imageSize = "300 x 300";
  }

  private getPages() {
    this.service.getPages().subscribe(res => {
      const result = res.filter(f => f.status === 1);
      this.types.Page = result.map(m => {
        m["url"] = m.slug;
        return m;
      });
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

  uploadImages(event) {
    if (event.status.status === "OK") {
      this.getContentList();
    } else {
      this.edit = false;
    }
  }

  private getContentList() {
    this.loader = true;
    this.service.getContents("grid").subscribe(res => {
      this.loader = false;
      this.grid = res;
      this.findGrid();
    });
  }

  private findGrid() {
    if (this.grid.length > 0) {
      this.contentId = this.grid[0].id;
      const data = this.grid[0].contents;
      this.edit = true;
      this.addNewClicked = false;
      this.initForm();
      this.updateForm(data);
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
    this.findGrid();
  }

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

  updateForm(data) {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (i !== 0) {
          this.textArray.push(this.initTextArray());
        }
        this.textArray.controls[i].patchValue(data[i]);
      }
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
    if (e.message) {
      if (e.status) {
        this.alert.success(this.alertContainer, e.message, true, 5000);
      } else {
        this.alert.error(this.alertContainer, e.message, true, 5000);
      }
    }
  }
}
