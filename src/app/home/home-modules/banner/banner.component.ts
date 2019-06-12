import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ContentResoveService } from '../../home-service/contetn-resolve.service';
import { getBannerSettings, getOnlineStore } from '../layout.config';

@Component({
  selector: 'banner',
  template: '<div clas="banner" #banner></div>',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  
  @ViewChild('banner', { read: ViewContainerRef }) layoutContaner;
  constructor(
    private service: ContentResoveService,
    private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const layout = getOnlineStore() ? getOnlineStore().store.layout : null;
    const layout_id = layout ? layout.layout_id : 0;
    this.createComponent(getBannerSettings(layout_id));
  }

  createComponent(comp) {
    const cf = this.resolver.resolveComponentFactory(comp);
    const componentRef = this.layoutContaner.createComponent(cf);
    componentRef.instance.data = this.service.contents && this.service.contents.bannerImages ? this.service.contents.bannerImages : this.bannerData;
  }

  get bannerData() {
    return [
      {
        id: 1,
        label: 'Banner 1 ',
        link: null,
        text: 'sample banner text',
        url: 'https://via.placeholder.com/400x475',
      }
    ];
  }
}
