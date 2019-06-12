import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, OnDestroy, ComponentRef } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Gateway } from '../../models/settings.models';
import { SettingService } from '../../setting-service/setting.service';
import { CardConectComponent } from './card-conect/card-conect.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit, OnDestroy {

  gateway: Gateway = new Gateway();
  selectedMethod;
  fields = [];
  id: number;
  sub: Subscription;
  componentRef: ComponentRef<any>;
  edit: boolean;
 
  @Input('gatewayAll') gatewayAll: Gateway[];
  @Input('methods') methods: string[];
  @Output('allertShow') allertShow = new EventEmitter();
  @ViewChild('cardConect', { read: ViewContainerRef }) cardConect: ViewContainerRef;

  constructor(private service: SettingService, private resolver: ComponentFactoryResolver) 
  { 
    this.gateway = new Gateway();
  }

  ngOnInit() {
    this.sub = this.service.editGateForm.subscribe(
      val => {
        this.edit = val.edit;
        if(this.edit) {
          this.gateway = val.data;
        } else {
          this.gateway = this.gatewayAll.length > 0 ? this.gatewayAll[0] : new Gateway();
        }
        // console.log(this.gateway, this.edit);
        this.id = this.gateway.id;
        this.selectedMethod = this.gateway.name;
        this.fields = this.formatGateField(this.gateway.config);
        if(this.selectedMethod) {
          this.createComponent();
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.componentRef.destroy();
  }

  changeMethod() {
    const data = this.gatewayAll.find( f => f.name.toLowerCase()===this.selectedMethod.toLowerCase());
    this.gateway = data ? data : new Gateway();
    this.selectedMethod = this.gateway.name;
    this.fields = this.formatGateField(this.gateway.config);
    if(this.selectedMethod) {
      this.createComponent();
    }
    // console.log(this.gateway, this.edit);
  }

  private formatGateField(data) {
    const arr: string[] = [];
    for(let d in data) {
      arr.push(d);
    }
    return arr;
  }

  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(CardConectComponent);
    this.cardConect.clear();
    this.componentRef = this.cardConect.createComponent(factory);
    this.componentRef.instance.gateway = this.gateway;
    this.componentRef.instance.fields = this.fields;
    this.componentRef.instance.id = this.id;
    this.componentRef.instance.edit = this.edit;
    this.componentRef.instance.submit.subscribe( e => this.allertShow.emit(e));
  }

}
