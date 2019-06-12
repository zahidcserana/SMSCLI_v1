import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../home-modules/type.model';
import { ContentResoveService } from '../../../home-service/contetn-resolve.service';
import { Subscription } from 'rxjs';
import { bannerImage } from '../../../home-modules/layout.config';

@Component({
    selector: 'product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

    description: string;
    contents: any;
    bannerImage: any;
    sub: Subscription

    constructor(private route: ActivatedRoute,
        public contentService: ContentResoveService) { }

    ngOnInit() {
        this.sub = this.route.data.subscribe(
            val => {
                this.description = val && val['product_details'] ? val['product_details'].description : '';
                this.getStoreContent();
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getStoreContent() {
        this.contents = this.contentService.contents;
        if (this.contents.cartBanner) {
            this.bannerImage = bannerImage(this.contents.cartBanner);
        }
    }

}
