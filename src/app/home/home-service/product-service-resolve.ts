import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { HttpService } from '../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductResolveService implements Resolve<any> {

    constructor(
        private http: HttpService,
        private service: ProductService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (router.routeConfig.path === 'products-list') {
            return this.service.getAllcaterogry();
        } else if (router.routeConfig.path === '') {
            return this.service.getAllcaterogry();
        } else if (router.url[1].path === 'search') {
            return this.service.getAllcaterogry();
        } else if (router.url[0].path === 'tag') {
            return this.service.getAllcaterogry();
        } else if (router.url[0].path === 'category') {
            const url = router.params.uuid;
            return this.service.getChildCategory(url);
        } else if (router.url[0].path === 'product') {
            if (router.params.id) {
                return this.getProducts(router.params.id);
            }
        }


        //  console.log(router)
    }

    async  getProducts(id) {
        let data: any;
        await this.service.getProduct(id).then(res => {
            data = res.result.data;
        });
        if(data) {
            await this.service.getRelatedProducts(data.id).then(res => {
                data['related_products'] = res.result.data ? res.result.data : [];
            });
        }
        return data;
    }
}
