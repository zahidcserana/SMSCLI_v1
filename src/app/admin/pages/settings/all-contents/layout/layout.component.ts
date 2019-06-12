import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  componentRef: ComponentRef<any>;

  @ViewChild('cusComponent', { read: ViewContainerRef }) cusComponent: ViewContainerRef;
  
  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.createComponent();
  }

  private createComponent() {
    let factory = this.resolver.resolveComponentFactory(ThemeComponent);
    this.cusComponent.clear();
    this.componentRef = this.cusComponent.createComponent(factory);
  }

}
