import {
    Component,
    OnInit,
    Injector,
    Input,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    AfterViewInit,
    OnDestroy,
    ComponentRef
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Product} from '../type.model';
import {DetailsLayout1Component} from './details-layout1/details-layout1.component';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'product-details',
    template: '<div #layout> </div>',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product: Product;
    sub: Subscription;
    componentRef: ComponentRef<any>;;
    @Input() contents;
    @ViewChild('layout', {read: ViewContainerRef}) layoutContaner: ViewContainerRef;

    constructor(
        private route: ActivatedRoute,
        private resolver: ComponentFactoryResolver
    ) {}

    ngOnInit() {
        this.sub = this.route.parent.data.subscribe(
            val => {
                this.product = val['product_details'];
                this.creatComponent();
            }
        );
        
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        if(this.componentRef) {
            this.componentRef.destroy();
        }
    }

    creatComponent() {
        const cf = this.resolver.resolveComponentFactory(DetailsLayout1Component);
        this.layoutContaner.clear();
        this.componentRef = this.layoutContaner.createComponent(cf);
        this.componentRef.instance.product = this.product;
        this.componentRef.instance.contents = this.contents;
    }


}
