import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ContentService } from '../../../setting-service/contents.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { isJson } from '../../../../../../globals/_classes/functions';
import { PageContent } from '../../../models/contents.model';

declare let $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  loader: boolean;
  contents = {
    heading: '',
    content: '',
    map_location: []
  }
  textForm: FormGroup;

  @Input('config') config: PageContent;
  @Input('edit') edit;
  @Output('submit') submit: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: ContentService,
    private fb: FormBuilder
  ) { 
    this.textForm = this.fb.group({
      location: this.fb.array([this.initTextArray()])
    })
  }

  ngOnInit() {
    if(this.edit && this.config.contents) {
      const data = isJson(this.config.contents) ? JSON.parse(this.config.contents) : '';
      if(data) {
        this.contents.heading = data.heading;
        this.contents.content = data.content;
        this.contents.map_location = data.map_location;
        this.updateForm(this.contents.map_location);
      }
    }
  }

  ngAfterViewInit() {
    this._description();
  }

  updateForm(data) {
    if(data) {
      for(let i=0; i<data.length; i++) {
        if(i !== 0) {
          this.textArray.push(this.initTextArray());
        }
        this.textArray.controls[i].patchValue(data[i]);
      }
    }
  }

  get textArray() {
    return this.textForm.get('location') as FormArray;
  }

  initTextArray() {
    return this.fb.group({lat:'', lng:''})
  }

  addNewText() {
    this.textArray.push(this.initTextArray());
  }

  deleteText(index) {
    this.textArray.removeAt(index);
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
    // console.log(this.config);
    if(this.config.slug && this.config.name) {
      this.loader = true;
      this.config.status = +this.config.status;
      this.contents.map_location = this.textArray.value;
      this.config.contents = JSON.stringify(this.contents);
      this.service.addUpdatePage(this.config, this.config.id, this.edit, this.submit).then(
        res => this.loader = false
      );
    } else {
      this.submit.emit({status: false, message: 'Page Name is required'})
    }
  }

}
