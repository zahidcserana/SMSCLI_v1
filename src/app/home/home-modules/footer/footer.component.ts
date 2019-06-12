import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ContentResoveService } from '../../home-service/contetn-resolve.service';
import { Content } from '../type.model';
import { getFooterSettings, getOnlineStore } from '../layout.config';
import { HomeService } from '../../home-service/home.service';

@Component({
  selector: 'app-footer',
  template: '<div  #footer></div>',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild('footer', { read: ViewContainerRef }) layoutContaner;
  constructor(
    private service: ContentResoveService,
    private resolver: ComponentFactoryResolver,
    private homeS: HomeService
  ) {
  }

  ngOnInit() {
    this.homeS.footer.subscribe(
      res => {
        const layout = getOnlineStore() ? getOnlineStore().store.layout : null;
        const layout_id = layout ? layout.layout_id : 0;
        this.createComponent(getFooterSettings(layout_id), res);
      }
    );
  }

  createComponent(comp, res) {
    const cf = this.resolver.resolveComponentFactory(comp);
    const componentRef = this.layoutContaner.createComponent(cf);
    componentRef.instance.contents = this.service.contents as Content;
    componentRef.instance.footer = res;
  }

}
