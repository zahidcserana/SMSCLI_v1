import { Component, AfterViewInit, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

declare let $: any;

@Component({
  selector: 'select2-ajax',
  templateUrl: './select2-ajax.component.html',
  styleUrls: ['./select2-ajax.component.css']
})
export class Select2AJAXComponent implements OnInit, AfterViewInit {
  
  @Input('prop') prop: string; // compolsary
  @Input('class') class: string; // compolsary
  @Input("domId") domId: string;
  @Input('url') url: string; // compolsary
  @Input('placeholder') placeholder: string;
  @Input('minword') minword: number;
  @Input('delay') delay: number;
  @Input('cache') cache: boolean; // compolsary
  @Input('allowClear') allowClear: boolean; //
  @Output('changeValue') changeValue: EventEmitter <any> = new EventEmitter(); // compolsary

  resultData = [];

  constructor(
    private authS: AuthService
  ) {}

  ngOnInit() {
     this.domId = this.domId ? this.domId : "";
  }

  ngAfterViewInit() {
    this.options();
    this.change();
  }

  private options() {
    $('#select2_ajax' + this.domId).select2({
      dropdownParent: $('#select2_ajax-parent-' + this.domId),
      placeholder: this.placeholder || 'Search for Select',
      allowClear: this.allowClear || true,
      ajax: this.makeOption(this.prop),
      minimumInputLength: this.minword || 3,
    });
  }

  private makeOption(prop) {
    return {
      url: this.url,
      headers: {
        Authorization : 'Bearer ' + this.authS.getToken()
      },
      delay: this.delay || 500,
      data: params => {
        return {
          search: params.term
        };
      },
      processResults: data => {
        let arr;
        if((typeof data).toLowerCase() === 'string') {
          arr = JSON.parse(data);
        } else {
          arr = data;
        }
        return {
          results: this.formateData(arr.result.data, this.prop)
        };

      },
      cache: this.cache || true
    };
  }

  private formateData(data, prop) {
    for (let d of data) {
      d['text'] = d[prop];
    }
    this.resultData = data;
    return data;
  }

  change() {
    $('#select2_ajax' + this.domId).change(() => {
      const value = $('#select2_ajax' + this.domId).val();
      const data = this.resultData.find( f => f.id == value);
      if(data) {
        this.changeValue.emit(data);
      }
    });
  }


}
