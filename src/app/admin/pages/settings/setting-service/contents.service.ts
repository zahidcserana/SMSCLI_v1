import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpService } from "../../../../modules/http-with-injector/http.service";
import { map, catchError } from "rxjs/operators";
import { resolve } from "q";
import { Content } from "../models/contents.model";

export interface ContentConfig {
  editMode: boolean;
  data?: Content;
  id?: number;
}
@Injectable()
export class ContentService {
  edit: BehaviorSubject<boolean> = new BehaviorSubject(null);
  editForm: BehaviorSubject<any> = new BehaviorSubject({
    edit: false,
    data: {}
  });

  initPageDropDown = [
    { slug: "terms-and-conditions", name: "Terms and Conditions" },
    { slug: "about", name: "About Us" },
    { slug: "contact", name: "Contact Us" }
  ];

  layoutColors = [
    {
      layout_id: 0,
      colorSettings: {
        primary_color: "#f2f3f8",
        secondary_color: "#555555",
        footer_background_color: "#444444",
        footer_background_img: "#444444",
        // theme_btn_background: '#f4f5f7',
        // theme_btn_color: '#f4f5f7',
        offer_background_color: "#444444",
        theme_color: "#444444",
        product_overlay_color: "#444444"
      },
      section: {
        grid: false,
        featured_product: false,
        new_arrival: false,
        promotion: false
      }
    },
    {
      layout_id: 1,
      colorSettings: {
        primary_color: "#f2f3f8",
        secondary_color: "#9dd7d1",
        footer_background_color: "#61afaf",
        footer_background_img: "#61afaf",
        // theme_btn_background: '#72c4bc',
        // theme_btn_color: '#ffffff',
        offer_background_color: "#61afaf",
        theme_color: "#61afaf",
        product_overlay_color: "#444444"
      },
      section: {
        grid: false,
        featured_product: false,
        new_arrival: false,
        promotion: false
      }
    },
    {
      layout_id: 2,
      colorSettings: {
        primary_color: "#f2f3f8",
        secondary_color: "#00bb00",
        footer_background_color: "#43A038",
        footer_background_img: "#43A038",
        // theme_btn_background: '#43a038',
        // theme_btn_color: '#ffffff',
        offer_background_color: "#43A038",
        theme_color: "#43A038",
        product_overlay_color: "#444444"
      },
      section: {
        grid: false,
        featured_product: false,
        new_arrival: false,
        promotion: false
      }
    }
  ];

  images = [
    {
      layout_id: 0,
      images: [
        "./assets/img/admin/layout/default/home.jpg",
        "./assets/img/admin/layout/default/listpage.jpg",
        "./assets/img/admin/layout/default/view.jpg",
        "./assets/img/admin/layout/default/cart.jpg"
      ]
    },
    {
      layout_id: 1,
      images: [
        "./assets/img/admin/layout/layout1/home.jpg",
        "./assets/img/admin/layout/layout1/listpage.jpg",
        "./assets/img/admin/layout/layout1/view.jpg",
        "./assets/img/admin/layout/layout1/cart.jpg"
      ]
    },
    {
      layout_id: 2,
      images: [
        "./assets/img/admin/layout/layout2/home.jpg",
        "./assets/img/admin/layout/layout2/listpage.jpg",
        "./assets/img/admin/layout/layout2/view.jpg",
        "./assets/img/admin/layout/layout2/cart.jpg"
      ]
    }
  ];

  constructor(private http: HttpService) {}

  formatPageDropDown(pages) {
    for (let a of this.initPageDropDown) {
      const ind = pages.findIndex(f => f.slug === a.slug);
      if (ind > -1) {
        pages.splice(ind, 1);
      }
      pages.splice(0, 0, a);
    }
    return pages;
  }

  summarNote() {
    return {
      height: 300,
      toolbar: [
        [
          "font",
          [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "clear"
          ]
        ],
        ["fontname", ["fontname", "fontsize", "color"]],
        ["para", ["style", "ol", "ul", "paragraph", "height"]],
        ["insert", ["hr", "link", "table", "picture", "video"]],
        ["view", ["undo", "redo", "fullscreen", "codeview", "help"]]
      ]
    };
  }

  fornmatSiteSecific(data) {
    const arr = [];
    for (let i in data) {
      const obj = {};
      obj["label"] = i
        .split("_")
        .map(m => m.charAt(0).toUpperCase() + m.slice(1))
        .join(" ")
        .toUpperCase();
      obj["group"] = i;
      obj["contorls"] = [];
      for (let k in data[i]) {
        obj["contorls"].push({
          label: k
            .split("_")
            .map(m => m.charAt(0).toUpperCase() + m.slice(1))
            .join(" "),
          name: k,
          value: data[i][k]
        });
      }
      arr.push(obj);
    }
    return arr; // .sort( (a,b) => a.label.includes('OTHER') ? 1 : -1);
  }

  getContentConfig(type?) {
    return this.http.get("contents/tags?type=" + type).pipe(
      map(res => res.result.data),
      catchError(e => of([]))
    );
  }

  addUpdate(data, id, edit, submit?) {
    let promise: Promise<any>;
    if (edit && id) {
      promise = this.editContent(id, data);
    } else {
      promise = this.addContent(data);
    }
    return promise
      .then(res => {
        if (res.status === "OK") {
          return this.sendEmitedData(true, res.result.message, submit);
        } else {
          return this.sendEmitedData(false, res.result.error, submit);
        }
      })
      .catch(err => {
        console.log(err);
        return this.sendEmitedData(
          false,
          "Something wrong!!! Please try again.",
          submit
        );
      });
  }

  sendEmitedData(error, message, submit) {
    const emit_data = { status: error, message: message };
    if (submit) {
      submit.emit(emit_data);
    }
    const loader: Promise<any> = new Promise((resolve, reject) => {
      if (submit) {
        resolve(false);
      } else {
        resolve({ loader: false, alert: emit_data });
      }
    });
    return loader;
  }

  addContent(data) {
    return this.http.post("contents", data).toPromise();
  }
  editContent(id, data) {
    return this.http.post("contents/" + id, data).toPromise();
  }
  deleteContent(id) {
    return this.http.delete("contents/" + id).toPromise();
  }
  getContents(type?) {
    return this.http.get("contents?type=" + type).pipe(
      map(res => res.result.data),
      catchError(e => of([]))
    );
  }

  // ******************* Layout ********************

  addLayout(data) {
    return this.http.post("layouts", data).toPromise();
  }

  getLayout() {
    return this.http.get("layouts").pipe(
      map(res => res.result.data),
      catchError(e => of({}))
    );
  }

  //  ****************** Page ***********************

  getPages() {
    return this.http.get("pages").pipe(
      map(res => res.result.data),
      catchError(e => of([]))
    );
  }

  addUpdatePage(data, id, edit, submit) {
    let promise: Promise<any>;
    if (edit && id) {
      promise = this.http.post("pages/" + id, data).toPromise();
    } else {
      promise = this.http.post("pages", data).toPromise();
    }
    return promise
      .then(res => {
        if (res.status === "OK") {
          return this.emitedData(true, res.result.message, submit);
        } else {
          return this.emitedData(false, res.result.error, submit);
        }
      })
      .catch(err => {
        console.log(err);
        return this.emitedData(
          false,
          "Something wrong!!! Please try again.",
          submit
        );
      });
  }

  emitedData(error, message, submit) {
    const emit_data = { status: error, message: message };
    submit.emit(emit_data);
    const loader: Promise<any> = new Promise((resolve, reject) => {
      resolve(false);
    });
    return loader;
  }

  deletePage(id) {
    return this.http.delete("pages/" + id).toPromise();
  }

  // ************** Menu *********************

  getTags() {
    return this.http.get(`tags`).pipe(
      map(res => res.result.data),
      catchError(e => of([]))
    );
  }

  getCategories() {
    return this.http.get(`categories/lists`).pipe(
      map(res => res.result),
      catchError(e => of([]))
    );
  }

  formateCategories(data) {
    const arr = [];
    for (const key in data) {
      const obj = {};
      obj["id"] = +key;
      obj["url"] = key;
      obj["name"] = data[key];
      arr.push(obj);
    }
    return arr;
  }

  getMenus() {
    return this.http.get("navigations").pipe(
      map(res => res.result.data),
      catchError(e => of([]))
    );
  }

  getCatagory(id) {
    return this.http
      .get(`categories/${id}`)
      .pipe(
        map(res => res.result.data),
        catchError(e => of(null))
      )
      .toPromise();
  }

  addUpdateMenu(data, id, edit, submit) {
    let promise: Promise<any>;
    if (edit && id) {
      promise = this.http.post("navigations/" + id, data).toPromise();
    } else {
      promise = this.http.post("navigations", data).toPromise();
    }
    return promise
      .then(res => {
        if (res.status === "OK" && !res.result.error) {
          return this.emitMenuData(true, "Menu has been saved", submit);
        } else {
          return this.emitMenuData(false, res.result.error, submit);
        }
      })
      .catch(err => {
        console.log(err);
        return this.emitedData(
          false,
          "Something wrong!!! Please try again.",
          submit
        );
      });
  }

  emitMenuData(error, message, submit) {
    const emit_data = { status: error, message: message };
    submit.emit(emit_data);
    const loader: Promise<any> = new Promise((resolve, reject) => {
      resolve(false);
    });
    return loader;
  }

  deleteMenu(id) {
    return this.http.delete("navigations/" + id).toPromise();
  }

  sortingMenu(f, l, data) {
    const sorted_data: number[] = data.filter(id => {
      return id !== f;
    });

    if (l) {
      sorted_data.splice(
        sorted_data.findIndex(id => {
          return id === l;
        }),
        0,
        f
      );
    } else {
      sorted_data.splice(sorted_data.length, 0, f);
    }

    return sorted_data;
  }

  formatMenuList(list, ids) {
    return list
      .map(m => {
        const ind = ids.indexOf(m.id);
        if (ind > -1) {
          m.sequence_no = ind + 1;
          return m;
        }
      })
      .sort((a, b) => a.sequence_no - b.sequence_no);
  }

  updateMenuList(data) {
    return this.http.post("navigations/sort", data).toPromise();
  }

  getTimezoneList() {
    return this.http.get("timezones/list").pipe(
      map(res => res.result),
      catchError(e => of([]))
    );
  }

  getTimeZone() {
    return this.http.get("timezones").pipe(
      map(res => res.result),
      catchError(e => of({ timezone: "" }))
    );
  }

  saveTimeZone(data) {
    return this.http.post("timezones", data).toPromise();
  }
}
