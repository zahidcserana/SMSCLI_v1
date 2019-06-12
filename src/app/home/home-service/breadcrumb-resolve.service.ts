import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from "@angular/router";
import { HttpService } from "../../modules/http-with-injector/http.service";
import { Tag, Category } from "../home-modules/type.model";

@Injectable({
  providedIn: "root"
})
export class BreadcrumbResolveService implements Resolve<any> {
  constructor(private http: HttpService) {}

  async resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let breadCrumb = new Object();
    const type = router.data["type"];

    if (type === "tag") {
      let tags: Tag[] = [];
      const path = router.params.url;
      const res = await this.http.get("tags").toPromise();
      if (res.result) {
        tags = res.result.data;
      }
      const data = tags.find(item => {
        if (item.url === path) {
          return true;
        }
      });
      data["type"] = "tag";
      breadCrumb = data;
    } else if (type === "category") {
      let categories: Category[] = [];
      const uuid = router.params.uuid;
      const res = await this.http.get("categories").toPromise();
      if (res.result) {
        categories = res.result.data;
      }
      breadCrumb = this.getCategoryData(categories, uuid);
    } else if (type === "all") {
      breadCrumb = {
        name: 'All Products List',
        type: "all",
      };
    } else {
      breadCrumb = {
        name: `Search for ${router.queryParams.params}`,
        id: null,
        url: "search",
        type: "search",
        search_url: router.queryParams.params
      };
    }
    return breadCrumb;
  }

  getCategoryData(categories, uuid) {
    for (const cat of categories) {
      if (cat.uuid === uuid) {
        cat["type"] = "category";
        return cat;
      } 
      if (cat.children && cat.children.length > 0) {
        const cate = this.getCategoryData(cat.children, uuid);
        if(cate) {
            return cate;
        }
      }
    }
  }
}
