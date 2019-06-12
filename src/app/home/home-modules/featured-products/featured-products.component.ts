import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { getFeaturedLayout, getOnlineStore } from '../layout.config';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { product_image } from '../../../globals/endPoint/config';
import { GET_STORE_ID } from '../../../globals/_classes/functions';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {
  @Input() type = 'new_arrival';
  products = [];
    

  @ViewChild('layout', { read: ViewContainerRef }) layoutContaner;
  constructor(
    private resolver: ComponentFactoryResolver,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.getFeaturedProducts();
  }


  private getFeaturedProducts() {

    this.http.get('products/featured').pipe( map( res => res.result.data), catchError (err => of([])))
    .subscribe(
      res => {
        this.products = res.map( m => {
          m['image'] = m['image'] ?  product_image + JSON.parse(sessionStorage.getItem('online_store')).store.id + '/' + m.id + '/' + m['image'] : './assets/img/home/product-image-placeholder.jpg';
          return m;
        });

        const layout = getOnlineStore() ? getOnlineStore().store.layout : null;
        const layout_id = layout ? layout.layout_id : 0;
        this.createComp(getFeaturedLayout(layout_id));
      }
    );
  }

  private createComp (comp) {
    const cf = this.resolver.resolveComponentFactory(comp);
    const componentRef = this.layoutContaner.createComponent(cf);
    componentRef.instance.actualValue = this.products;
    componentRef.instance.type = this.type;
  }

}
