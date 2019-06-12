import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../../setting-service/contents.service';
import { isJson } from '../../../../../../globals/_classes/functions';
import { PageContent } from '../../../models/contents.model';

declare let $:any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewInit {

  loader: boolean;
  contents = {
    heading: '',
    content: ''
  }

  @Input('config') config: PageContent;
  @Input('edit') edit;
  @Output('submit') submit: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: ContentService
  ) { }

  ngOnInit() {
    if(this.edit && this.config.contents) {
      const data = isJson(this.config.contents) ? JSON.parse(this.config.contents) : '';
      if(data) {
        this.contents.heading = data.heading;
        this.contents.content = data.content;
      }
    }
  }

  ngAfterViewInit() {
    this._description();
  }

  private _description = ()=> {    
    $('.summernote-content').summernote(this.service.summarNote());

      $('.summernote-content').on('summernote.blur', ()=> {
        this.contents.content = $('.summernote-content').summernote('code');
      });
      if(this.edit && this.config.contents) {
        $('.summernote-content').summernote('code', this.contents.content); 
      }
  };

  save() {
    // console.log(this.config)
    if(this.config.slug && this.config.name) {
      this.loader = true;
      this.config.status = +this.config.status;
      this.config.contents = JSON.stringify(this.contents);
      this.service.addUpdatePage(this.config, this.config.id, this.edit, this.submit).then(
        res => this.loader = false
      );
    } else {
      this.submit.emit({status: false, message: 'Page Name is required'})
    }
    
  }

}
