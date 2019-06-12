import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { InventoryService } from './inventory.service';



@Injectable()
export class InventoryResolveService implements Resolve<any> {

    constructor(private service: InventoryService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        switch (router.routeConfig.path) {
            case '':
                return this.service.getSupplier();
            case 'add':
                return this.service.getSupplier();
            case 'description':
                return this.service.getProductDescription(this.getId(router));
            case 'availability':
                return this.service.getProduct(this.getId(router));
            case 'related-product':
                return this.service.getRelatedProductList(this.getId(router));
            case 'variant':
                return this.service.getAttributeChain(this.getId(router));
            case 'images':
                return this.service.getAttributeList(this.getId(router));
            case 'calendar':
                return this.service.getAttributeList(this.getId(router));
            case 'categories':
                return this.service.getCategoryList(this.getId(router));
            case 'pricing':
                return this.service.getAttributeList(this.getId(router));
            case 'product-quantity-list':
                return this.service.getSupplier();
        }
    }

    private getId(router) {
        let id = router.parent.params.product_id;
        id = id ? id : router.parent.parent.parent.params.product_id;
        return id;
    }
}