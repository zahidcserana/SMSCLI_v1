import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { VariantSet, Variant } from '../../models/settings.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from '../../setting-service/setting.service';
import { Helpers } from '../../../../../helpers';

declare let $:any;

@Component({
  selector: 'attribute-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  attribute:Variant;
  edit: boolean;
  openForm: boolean;
  loader: boolean;
  index: number;


  @Input('attributeSet') attributeSet:VariantSet;
  @Output('alert') alert:EventEmitter <any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private settingS: SettingService
  ) {
    this.attribute = new Variant();
   }

  ngOnInit() {
  }

  trackAtt(index, att) {
    return att ? att.id : null;
  }

  initAddAttribute(){
    this.attribute = new Variant();
    this.openAddEditForm(false);
  }

  editAttribute(att, i){
    this.attribute = Object.assign({}, att);
    this.openAddEditForm(true);
    this.index = i;
    // console.log(att,i)
  }

  submitAttribute(){
    this.attribute.variant_set_id = this.attributeSet.id;
    // console.log(this.attribute);
    this.loader = true;
    this.settingS.addAttribute(this.attribute, this.attributeSet.id)
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(false, 'Variant value has been added');
        this.attributeSet.variants.push(res.result.data);
        this.attribute = new Variant();
        this.openForm = false;
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Variant value has been not added');
      }
    ); 
  }

  updateAttribute(){
    this.loader = true;
    this.settingS.updateAttribute(this.attributeSet.id, this.attribute.id,this.attribute)
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(false, 'Variant value has been updated');
        this.attributeSet.variants[this.index] = res.result.data;
        this.openForm = false;
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Variant value has been not updated');
      }
    );
  }

  openAddEditForm(b){
    this.edit = b;
    this.openForm = true;
  }

  sendEmitedData(error, message) {
    this.loader = false;
    Helpers.setLoading(false);
    const emit_data = {error: error, message: message};
    this.alert.emit(emit_data);
  }

  deleteAttribute(id, i){
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      if(result){
        Helpers.setLoading(true);
        this.archiveAttribute(id, i)
      }
    });
    
  }

  archiveAttribute(id, i) {
    this.settingS.deleteAttribute(id).then(
      res => {
        this.sendEmitedData(false, 'Variant value has been deleted');
        this.attributeSet.variants.splice(i,1);
      }
    ).catch (
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Variant value has been not deleted');
      }
    )
  }

}
