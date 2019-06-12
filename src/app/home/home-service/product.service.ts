import { Injectable } from "@angular/core";
import { HttpService } from "../../modules/http-with-injector/http.service";
import { of, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Category, BreadCrumb } from "../home-modules/type.model";

export interface GatewayConfig {
  offLoader: boolean;
}
export interface ProductQuerySettings {
  reload?: boolean;
  queryString?: any;
  query?: boolean;
}
export interface ProductFliterSettings {
  reload?: boolean;
  selected_category?;
  removeItem?: any;
  isRemove?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private filterSubject: ProductFliterSettings = {
    reload: false,
    selected_category: [],
    isRemove: false
  };
  filterSettings = new BehaviorSubject(this.filterSubject);
  constructor(private http: HttpService) {}
  findIndex(array, id) {
    return array.findIndex(f => {
      return Number(id) === Number(f.id);
    });
  }

  formateChildCategoryData(data: Category[]) {
    const newArray: Category[] = [];
    data.filter(item => {
      const obj = {
        id: item.id,
        name: item.name,
        url: item.url,
        children: item.children
      };
      newArray.push(obj as Category);
    });

    return newArray;
  }

  initQueryParamArray(item) {
    const obj = { id: "2343e4", name: "category", values: [] };
    obj.values.push(item.id);
    return obj;
  }

  findCateArrayIndex(array, id) {
    return array.indexOf(id);
  }

  makeQueryPram(params) {
    const query = {};
    for (const i of params) {
      query[i.name] = i.values.join(",");
    }
    return query;
  }

  getProducts(data: BreadCrumb) {
    let url = "";
    let obj = new Object();
    obj["limit"] = 21;
    obj["page_no"] = data.page_no ? data.page_no : 1;
    if (data.type === "tag") {
      url = "products/online";
      obj = Object.assign(obj, this.formatQueryProperty(data));
    } else if (data.type === "category") {
      url = "category/products/" + data.uuid;
      obj = Object.assign(obj, this.formatQueryProperty(data));
    } else if (data.type === "search") {
      url = `search/products`;
      obj["category_id"] = "";
      obj["search"] = data.search_url;
    } else if (data.type === "all") {
      url = "products/online";
      obj["category_id"] = "";
      obj['all'] = true;
    }
    return this.http.post(url, obj).toPromise();
  }

  getQueryProduct(data: BreadCrumb, query) {
    let url = "";
    if (data.type === "tag") {
      url = "products/online";
      query["tag_id"] = data.id;
    } else if (data.type === "category") {
      url = "category/products/" + data.uuid;
    } else if (data.type === "search") {
      url = `search/products`;
      query["search"] = data["search_url"];
    } else if (data.type === "all") {
      url = `products/online`;
      query["all"] = true;
    }
    return this.http.post(url, query).toPromise();
  }

  getAllcaterogry() {
    return this.http.get("categories").pipe(
      map(res => {
        const data = { categories: res.result.data };
        data["type"] = "all";
        return data;
      }),
      catchError(err => of([]))
    );
  }

  getProduct(id) {
    return this.http.get("products/" + id + "/user/details").toPromise();
  }

  getChildCategoryVariants(id) {
    return this.http.post("user/get-child-variant/", { category: id }).pipe(
      map(res => {
        return res.result.data.variant_sets;
      })
    );
  }

  getRelatedProducts(id: number) {
    return this.http
      .get("products/" + id + "/user/related-products")
      .toPromise();
  }

  getChildCategory(uuid) {
    return this.http.get("get/child-categories/" + uuid).pipe(
      map(res => {
        const data = { categories: res.result.data };
        if (Array.isArray(res.result.data)) {
          data["type"] = "all";
        } else {
          data["type"] = "single";
        }
        return data;
      }),
      catchError(err => of([]))
    );
  }
  getParentCategoryVariant(id) {
    return this.http.post("user/categories", { category: id }).pipe(
      map(res => {
        return res.result.data.variant_sets;
      })
    );
  }

  formatQueryProperty(data) {
    const obj = new Object();
    obj["price_max"] = null;
    obj["price_min"] = null;
    obj["purchase_type"] = "";
    obj["tag_id"] = data.type === "tag" ? data.id : "";
    obj["category_id"] = "";
    obj["variants"] = null;
    return obj;
  }
}
