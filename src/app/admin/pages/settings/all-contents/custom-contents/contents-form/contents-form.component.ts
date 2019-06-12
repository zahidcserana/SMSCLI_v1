import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { formateConfig } from '../../../../../../globals/_classes/functions';
import { Content } from '../../../models/contents.model';
import { ContentService } from '../../../setting-service/contents.service';

@Component({
  selector: 'app-contents-form',
  templateUrl: './contents-form.component.html',
  styleUrls: ['./contents-form.component.css']
})
export class ContentsFormComponent implements OnInit {

  config: Content;
  contentData = {
    tag_type: '',
    contents: ''
  };
  contentId: number;
  edit: boolean;
  type: string;
 
  @Output('allertShow') allertShow = new EventEmitter();

  constructor(private service: ContentService) {
    this.config = new Content();
  }

  ngOnInit() {
    this.service.editForm.subscribe(
      val => {
        this.edit = val.edit;
        if(val.edit) {
          this.contentData = val.data.contents;
          this.contentId = val.data.id;
          this.type = this.contentData.tag_type;
          this.config = val.data.config;
          this.service.edit.next(true);
        } else {
          this.contentData = null;
          this.contentId = null;
          this.config = new Content();
          this.service.edit.next(false);
          this.type = '';
          this.initConfig('', '', 1);
        }
      }
    );
  }

  createTag() {
    if(this.config.label) {
      const t = this.config.label.split(' ');
      this.config.tag = 'custom_' + t.map( m => m.toLowerCase()).join('_');
    } else {
      this.config.tag = '';
    }
  }

  private initConfig(tag, type, status) {
    this.config.tag = tag;
    this.config.type = 'custom';
    this.config.status = status;
  }

  showMessage(e) {
    this.allertShow.emit(e);
  }
  
}
