import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { isJson } from '../../../../../../globals/_classes/functions';
import { ContentService } from '../../../setting-service/contents.service';

@Component({
  selector: 'app-link-type',
  templateUrl: './link-type.component.html',
  styleUrls: ['./link-type.component.css']
})
export class LinkTypeComponent implements OnInit {

  textForm: FormGroup;
  loader: boolean;
  edit: boolean;

  @Input('config') config;
  @Input('contents') contents;
  @Input('contentId') contentId;
  @Output('submit') submit:EventEmitter <any> = new EventEmitter();

  constructor(
    private service: ContentService, 
    private fb: FormBuilder
    ) { 
    this.textForm = this.fb.group({
      contents: this.fb.array([this.initTextArray()])
    })
  }

  ngOnInit() {
    this.service.edit.subscribe(
      val => {
        this.edit = val;
        if(this.edit) {
          this.contents = this.contents ? this.contents.contents : null;
          this.updateForm(this.contents);
        }
      }
    );
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
    return this.textForm.get('contents') as FormArray;
  }

  initTextArray() {
    return this.fb.group({label:'', link:''})
  }

  addNewText() {
    this.textArray.push(this.initTextArray());
  }

  deleteText(index) {
    this.textArray.removeAt(index);
  }

  save() {
    this.loader = true;
    this.config.status = +this.config.status;
    const data = {
      config: this.config,
      contents: JSON.stringify({contents: this.textArray.value, tag_type: 'link'})
    }
    this.service.addUpdate(data, this.contentId, this.edit, this.submit).then(
      res => this.loader = false
    );
    
  }


}
