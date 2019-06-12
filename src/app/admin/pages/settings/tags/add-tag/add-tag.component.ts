import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../../../sidebar-service/sidebar.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { stringify } from 'querystring';
import { Tag } from '../../models/settings.models';
import { TagService } from '../tag.setvice';
import { SettingService } from '../../setting-service/setting.service';

@Component({
  selector: 'add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  edit: boolean;
  tag: Tag;
  loader: boolean;
  @Output() submitForm = new EventEmitter();
  tagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tagS:TagService,
    private settingS: SettingService,
    private sidebarS: SidebarService) {
    this.tagForm = this.fb.group({
      name: '',
      is_shown_in_nav: false
    });
    this.tagS.tagReload.subscribe(val => {
      if (val.reload) {
        this.tagForm.reset();
        this.edit = val.editMode;
      }
      if (val.editMode) {
        this.edit = val.editMode;
        this.tagForm.patchValue(val.tag);
        this.tag = val.tag;
      }
    });

  }

  ngOnInit() {
  }

  formatData(data) {
    return {
      name: data['name'],
      is_shown_in_nav: data['is_shown_in_nav'] ? true : false
    }
  }

  submit() {
    this.loader = true;
    this.settingS.addTag(this.formatData(this.tagForm.getRawValue()))
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(res.result.data, false, 'Tag has been added');
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData([], true, 'Something wrong! Tag has been not added');
      }
    );
  }

  update() {
    this.loader = true;
    this.settingS.updateTag(this.tag.id,this.formatData(this.tagForm.getRawValue()))
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(res.result.data, false, 'Tag has been updated')
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData([], true, 'Something wrong! Tag has been not updated')
      }
    );
  }

  sendEmitedData(result, error, message) {
    this.loader = false;
    // console.log(result);
    const emit_data = {data: result, alert: {error: error, message: message}}
    this.submitForm.emit(emit_data);
  }
}

