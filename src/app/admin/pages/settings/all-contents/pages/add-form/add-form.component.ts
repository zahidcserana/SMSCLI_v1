import { Component, OnInit, ComponentRef, ViewContainerRef, ViewChild, ElementRef, Input, EventEmitter, Output, ComponentFactoryResolver } from '@angular/core';
import { PageContent } from '../../../models/contents.model';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  
  componentRef: ComponentRef<any>;
  contentId: number;
  content: string;
  slug: string;

  @ViewChild('pageComponent', { read: ViewContainerRef }) pageComponent: ViewContainerRef;
  @Input('config') config: PageContent;
  @Input('pages') pages: any[];
  @Input('edit') edit: boolean;
  @Input('addNew') addNew: boolean;
  @Output('submit') submit: EventEmitter<any> = new EventEmitter();


  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() { 
    if(this.addNew || this.edit) {
      this.createComponent();
    }
    this.slug = this.edit ? this.config.slug : '';
  }

  changeSelect() {
    if(this.slug) {
      const data = this.pages.find( f => f.slug === this.slug);
      this.config.name = data.name;
      this.config.slug = data.slug;
      this.createComponent();
    } else {
      this.config = new PageContent();
      this.componentRef.destroy();
    }
  }

  createSlug() {
    this.config.slug = 'custom_' + this.config.name.split(' ').map( m => m.toLowerCase()).join('_');
  }

  // ******************* Create Component *************************

  private createComponent() {
    const factory = this.config.slug === 'contact' ? this.resolver.resolveComponentFactory(ContactUsComponent) : this.resolver.resolveComponentFactory(AboutUsComponent);
    this.initComponent(factory);
  }

  private initComponent (factory) {
    this.pageComponent.clear();
    this.componentRef = this.pageComponent.createComponent(factory);
    this.componentRef.instance.config = this.config;
    this.componentRef.instance.edit = this.edit;
    this.componentRef.instance.submit.subscribe( e => this.submit.emit(e));
  }

}
