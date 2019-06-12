import { Component, AfterViewInit, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { HttpService } from '../http-with-injector/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

declare let $: any;

@Component({
  selector: 'select2-add-option',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css']
})
export class Select2AddOptionComponent implements OnChanges, OnInit, AfterViewInit {

  loader: boolean;
  
  @Input('prop') prop: string; // compolsary
  @Input('parent') parent: string; // compolsary
  @Input('data') data: any[]; // compolsary should have 'name' field
  @Input('url') url: string;
  @Input('domId') domId: string; // For multiple select 2 use in same component
  @Input('allowClear') allowClear: boolean; //
  @Input('multi') multi: boolean;
  @Input('value') value: any;
  @Input('edit') edit: boolean;
  @Input('placeholder') placeholder: string; // only Field name
  @Output('changeValue') changeValue: EventEmitter <any> = new EventEmitter(); // compolsary

  constructor(
    private http: HttpService,
    private modalService: NgbModal
  ) {}

  ngOnChanges() {
    if(this.edit && this.value) {
      setTimeout(() => {
        this.setValue(this.value);
      }, 100);
    }
  }

  ngOnInit() {
    this.domId = this.domId ? this.domId : '';
    this.placeholder = this.placeholder ? this.placeholder : 'One';
  }

  ngAfterViewInit() {
    this.options();
    this.change();
  }

  private options() {
    $('#select2_add_option' + this.domId).select2({
      multiple: this.multi,
      dropdownParent: $('#select2_add_option_parent' + this.domId),
      placeholder: `-Select ${this.placeholder}-` ,
      tags: true,
        // Allows user created new options.  Needs tag set to true.
        createTag: (params) => {
          var term = $.trim(params.term);
      
          if (term === '') {
            return null;
          }
      
          return {
            id: term,
            text: term,
            newOption: true // add additional parameters
          }
        },
        templateResult: (d) => {
          if (d.newOption) {
              var $result = $(`<span class="btn btn-brand btn-block text-center" style="font-weight: 500; margin-right: 20px;"></span>`);
              $result.text(`Add "${d.text}" as new ${this.placeholder}`);
              return $result;
          }
          return d.text;
        }
    });
  }

  change() {
    $('#select2_add_option' + this.domId).on('select2:select', (e) => {
      const value = e.params.data;
      if(value.newOption) {
        const d = {};
        d[this.prop] = value.text;
        if(this.url == 'sections'){
            d['class_id'] = this.parent;
        }
        this.dilogBox(d);
      } else {
        if(this.multi) {
          const val: any[] = $('#select2_add_option' + this.domId).val();
          this.changeValue.emit({id: val});
        } else {
          this.changeValue.emit({id: +value.id});
        }
      }
    });
  }

  addNew(d) {
    console.log(d);
    this.loader = true;
    this.http.post(this.url, d).toPromise().then(
      res => {
        if (res.result.error) {
          this.initSelect2({id: 0, message: res.result.error});
        } else {
          res.result.data['name'] = res.result.data[this.prop];
          this.data.push(res.result.data);
          this.initSelect2({id:res.result.data.id});
        }
      }
    ).catch(
      err => {
        console.log(err);
        this.initSelect2({id: 0, message: 'Something wrong! Variant has been not added'});
      }
    );
  }

  setValue(value) {
    $('#select2_add_option' + this.domId).val(value).trigger('change.select2');
  }

  initSelect2(d) {
    this.changeValue.emit(d);
    setTimeout(() => {
      if(this.multi) {
        const val: any[] = $('#select2_add_option' + this.domId).val();
        val.splice(val.length-1, 1, d.id);
        this.setValue(val);
        this.changeValue.emit({id: val});
      } else {
        this.setValue(d.id); 
        this.changeValue.emit({id: d.id});
      }
    }, 100);
    this.loader = false; 
  }

  dilogBox(d) {
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = `Do you want to add as new "${this.placeholder}"`;
    modalRef.result
    .then((result)=>{
      if(result){
        this.addNew(d);
      } else {
        this.reset();
      }
    },(res)=>{
      this.reset();
    });
  }

  reset() {
    if(this.multi) {
      const val: any[] = $('#select2_add_option' + this.domId).val();
      val.splice(val.length-1, 1);
      // console.log(val);
      this.setValue(val);
      this.changeValue.emit({id: val}); 
    } else {
      this.setValue(0); 
      this.changeValue.emit({id: 0});
    }
  }


}
