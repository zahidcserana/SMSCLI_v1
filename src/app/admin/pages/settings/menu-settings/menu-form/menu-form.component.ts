import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../models/contents.model';
import { ContentService } from '../../setting-service/contents.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  selectTypeArray = [];
  type: string = '';
  url: string;
  selectUrl: string;
  loader: boolean;


  @Input('types') types;
  @Input('menu') menu: Menu;
  @Input('edit') edit: boolean;
  @Output('submit') submit: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: ContentService
  ) { }

  ngOnInit() {
    if(this.edit) {
      this.type = this.menu.content_type;
      this.selectTypeArray = this.types[this.type];
      const data = this.menu.content_url.split('/');
      if(this.type === 'Category') {
        this.selectUrl = this.menu.content_id.toLocaleString();
      } else {
        this.selectUrl = data.length > 1 ? data[1] : data[0];
      }
      // console.log(this.selectUrl);
    }
  }

  changeType() {
    if(this.type) {
      this.menu.content_type = this.type;
      if(!(this.type === 'External')) {
        this.selectTypeArray = this.types[this.type];
        this.menu.content_id = this.selectTypeArray[0] ? this.selectTypeArray[0].id : null;
        this.selectUrl = this.selectTypeArray[0] ? this.selectTypeArray[0].url : null;
        this.createUrl();
      } else {
        this.menu.content_url = '';
        this.menu.content_id = null;
      }
    } else {
      this.selectTypeArray = [];
      this.menu.content_type = this.type;
      this.menu.content_id = null;
      this.menu.content_url = null;
    }
  }

  changeUrl() {
    this.menu.content_id = this.selectTypeArray.find( f => f.url === this.selectUrl).id;
    this.createUrl();
  }

  private createUrl() {
    switch (this.type) {
      case 'Tag': 
        this.menu.content_url = 'tag/' + this.selectUrl;
        break;
      case 'Category':
        this.menu.content_url = 'category/';
        break;
      case 'Page':
        if(this.selectUrl === 'contact') this.menu.content_url = this.selectUrl;
        else if(this.selectUrl === 'about') this.menu.content_url = this.selectUrl;
        else if(this.selectUrl === 'terms-and-conditions') this.menu.content_url = this.selectUrl;
        else this.menu.content_url = 'page/' + this.selectUrl;
        break;
    }
  }

  save() {
    if(this.menu.content_url) {
      this.loader = true;
      this.menu.status = +this.menu.status;
      // console.log(this.menu.content_url)
      this.service.addUpdateMenu(this.menu, this.menu.id, this.edit, this.submit).then(
        res => this.loader = false
      );
    } else {
      this.submit.emit({status: false, message: 'Please enter required fields'})
    }
  }


}
