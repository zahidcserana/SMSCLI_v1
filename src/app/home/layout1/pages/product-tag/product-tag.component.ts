import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../home-service/product.service';
import { Tag, Product, BreadCrumb } from '../../../home-modules/type.model';
import { ActivatedRoute } from '@angular/router';
import { ContentResoveService } from '../../../home-service/contetn-resolve.service';
import { bannerImage } from '../../../home-modules/layout.config';


@Component({
    selector: 'product-tag',
    templateUrl: './product-tag.component.html',
    styleUrls: ['./product-tag.component.css']
})
export class ProductTagComponent implements OnInit {

    page = 1;
    breadCrumb: BreadCrumb;
    products: Product[] = [];
    contents: any;
    bannerImage: any;
    tag: Tag;
    loaded: boolean;
    loader: boolean;
    limit = 21;
    total_products;
    query_string: any;
    isQueryProduct: boolean;
    pageNumbers = [20, 40, 60, 80, 100];

    constructor(private activeRoute: ActivatedRoute,
        private service: ProductService,
        private contentService: ContentResoveService) { }

    ngOnInit() {
        this.activeRoute.data.subscribe(res => {
            this.breadCrumb = res.breadCrumb;
        });

        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
    }

    loadList(param) {
        if (param.query) {
            this.isQueryProduct = param.query;
            this.query_string = param.queryString;
            this.getQueryProduct(); 
        } else {
            this.getProducts();
        }
    }

    getQueryProduct() {
        this.loader = true;
        this.service.getQueryProduct(this.breadCrumb, this.query_string).then(resp => {
            this.products = resp.result.data;
            this.total_products = resp.result.total;
            this.loaded = true;
            this.loader = false;
        });
    }

    getProducts() {
        this.loader = true;
        this.service.getProducts(this.breadCrumb).then(res => {
            this.products = res.result.data;
            this.total_products = res.result.total;
            this.loaded = true;
            this.loader = false;
        });
    }

    getBannerImage() {
        if (this.contents.productListBanner) {
            this.bannerImage = bannerImage(this.contents.productListBanner);
        }
    }

    paginate(e) {
        if (this.isQueryProduct) {
            this.query_string['page_no'] = e.page;
            this.getQueryProduct();
        } else {
            this.breadCrumb.page_no = e.page;
            this.getProducts();
        }
    }
}
