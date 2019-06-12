import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Category, CategoryItem, BreadCrumb } from "../type.model";
import { Subscription } from "rxjs";
import { ProductService } from "../../home-service/product.service";

declare let $: any;

class QueryString {
  limit: number = 21;
  tag_id: number;
  purchase_type: string;
  category_id: string;
  page_no: number = 1;
  variants: string;
  price_min: string;
  price_max: string;
}

@Component({
  selector: "product-filtering",
  templateUrl: "./product-filtering.component.html",
  styleUrls: ["./product-filtering.component.css"]
})
export class ProductFilteringComponent implements OnInit, OnDestroy {
  filter_type: string;
  productQueryPrams = [];
  selectedCategory = [];
  categories: Category[];
  childCategory: Category[] = [];
  siblingCategory: Category[] = [];
  sub: Subscription[] = [];
  queryString: QueryString = new QueryString();

  @Input() breadCrumb: BreadCrumb;
  @Output() queryChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private service: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub[0] = this.route.parent.data.subscribe(res => {
      this.setCategoryFilter(res.categories);
    });

    this.service.filterSettings.subscribe(res => {
      if (res.isRemove) {
        this.removeTag(res.removeItem);
      }
    });
  }

  ngOnDestroy() {
    this.sub.forEach(f => f.unsubscribe());
  }

  goToCategory(item) {
    this.selectedCategory = [];
    this.addFilterItems();
    this.router.navigateByUrl(`/category/${item.uuid}/${item.url}`);
  }

  setCategoryFilter(res) {
    this.filter_type = res.type;
    if (this.filter_type === "single") {
      this.childCategory = res.categories.child;
      this.siblingCategory = res.categories.sibling;
      this.getSelectedQueryParams([this.childCategory]);
    } else {
      this.categories = res.categories;
      this.getSelectedQueryParams(this.categories);
    }
    this.queryChange.emit({
      query: this.queryString.category_id ? true : false,
      queryString: this.queryString
    });
  }

  getSelectedQueryParams(data) {
    this.queryString = new QueryString();
    this.selectedCategory = [];
    let queryParamMap, params;
    this.sub[1] = this.route.parent.queryParamMap.subscribe(val => {
      queryParamMap = val.get("category");
      params = val.get("params");
    });
    if (params) {
      this.productQueryPrams.push({ name: "params", values: [params] });
    }
    const ids = queryParamMap ? queryParamMap.split(",").map(m => +m) : null;
    if (ids) {
      this.queryString.category_id = queryParamMap;
      const parents = [];
      this.checkQueryParamData(data, ids, parents);
      parents.forEach( f => {
        setTimeout(() => {
          $("#collapseOne" + f).collapse("show");
        }, 500);
      });
    }
  }

  private checkQueryParamData(categories, ids, parents, obj?) {
    for (const cat of categories) {
      if (ids.includes(cat.id)) {
        cat["check"] = true;
        this.formatProductQuery(cat, "category");
        if (obj.parent === 0 && !parents.includes(obj.cat))
          parents.push(obj.cat);
      }
      if (cat.children && cat.children.length > 0) {
        this.checkQueryParamData(cat.children, ids, parents, {
          cat: cat.id,
          parent: cat.parent_id
        });
      }
    }
  }

  resetAll() {
    let data = [];
    
    if (this.filter_type === "single") {
      data = [this.childCategory];
    } else {
      data = this.categories;
      data.forEach( f => $("#collapseOne" + f.id).collapse("hide"));
    }
    if (this.selectedCategory && this.selectedCategory.length > 0) {
      this.unCheckAll(data);
      this.selectedCategory = [];
      this.addFilterItems();
      this.productQueryPrams = [];
      this.router.navigate(["./"], {
        relativeTo: this.route
      });
      this.queryString = new QueryString();
      this.queryChange.emit({ query: false, queryString: this.queryString });
    }
  }

  private unCheckAll(categories) {
    for (const cat of categories) {
      cat["check"] = false;
      if (cat.children && cat.children.length > 0) {
        this.unCheckAll(cat.children);
      }
    }
  }

  private formatProductQuery(item, name) {
    const index = this.productQueryPrams.findIndex(f => name === f.name);
    if (index > -1) {
      if (!this.productQueryPrams[index]["values"].includes(item.id)) {
        this.productQueryPrams[index]["values"].push(item.id);
      }
    } else {
      this.productQueryPrams.push(this.initQueryParamArray(item, name));
    }
    this.selectedCategory.push(item);
    this.addFilterItems();
  }

  filterProduct(e, item: CategoryItem, name) {
    const check = e.target.checked;
    if (check) {
      this.formatProductQuery(item, name);
    } else if (check === false) {
      const index = this.productQueryPrams.findIndex(f => name === f.name);
      this.uncheckedAction(index, item);
    }
    this.generateCategoryIds();
  }

  private initQueryParamArray(item, name) {
    const obj = { name: name, values: [] };
    obj.values.push(item.id);
    return obj;
  }

  private addFilterItems() {
    this.service.filterSettings.next({
      reload: true,
      selected_category: this.selectedCategory
    });
  }

  private generateCategoryIds() {
    this.createQuery();
    this.queryParamChange();
  }

  private queryParamChange() {
    const query = {};
    for (const i of this.productQueryPrams) {
      query[i.name] = i.values.join(",");
    }
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParams: query
    });
  }

  private uncheckedAction(index, item) {
    const item_in = this.productQueryPrams[index]["values"].findIndex(
      f => f.id === item.id
    );
    this.selectedCategory = this.selectedCategory.filter(i => {
      return item.id !== i.id;
    });
    this.productQueryPrams[index].values.splice(item_in, 1);
    if (this.productQueryPrams[index].values.length < 1) {
      this.productQueryPrams.splice(index, 1);
    }
    this.addFilterItems();
  }

  private createQuery() {
    this.queryString.page_no = 1;
    const categoryIds = [];
    this.selectedCategory.forEach(cId => {
      categoryIds.push(cId.id);
    });
    if (!categoryIds.length) {
      this.queryChange.next({ query: false, queryString: "" });
    } else {
      this.queryString.category_id = categoryIds.toString();
      this.queryChange.next({
        queryString: this.queryString,
        query: true
      });
    }
  }

  removeTag(e) {
    const i = e.index;
    const id = e.id;
    let attrId;
    this.selectedCategory.splice(i, 1);
    this.productQueryPrams = this.productQueryPrams
      .map(attr => {
        const index = attr.values.indexOf(id);
        if (index > -1) {
          attrId = attr.id;
          attr.values.splice(index, 1);
        }
        return attr;
      })
      .filter(item => {
        return item.values.length > 0;
      });
    this.unSelectCheckBox(attrId, id);
    this.generateCategoryIds();
  }

  private unSelectCheckBox(attrId, itemId) {
    let index: number;
    let data = [];
    if (this.filter_type === "single") {
      data = [this.childCategory];
    } else {
      data = this.categories;
    }
    data.forEach((item, i) => {
      item.children.forEach(data => {
        if (data.id === itemId) {
          index = i;
        }
      });
    });
    if (index > -1) {
      for (const i of data[index].children) {
        if (i.id === itemId) {
          i["check"] = false;
          break;
        }
      }
    }
  }
}
