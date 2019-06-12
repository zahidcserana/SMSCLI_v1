import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Terminal, Stores } from '../../models/settings.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingService } from '../../setting-service/setting.service';
import { Helpers } from '../../../../../helpers';


declare let $:any;

@Component({
  selector: 'terminal-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  terminal: Terminal;
  edit: boolean;
  openForm: boolean;
  loader: boolean;
  index: number;


  @Input('store') store: Stores;
  @Output('alert') alert:EventEmitter <any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private settingS: SettingService
  ) {
    this.terminal = new Terminal();
   }

  ngOnInit() {
  }

  trackAtt(index, att) {
    return att ? att.id : null;
  }

  initAddTerminal(){
    this.terminal = new Terminal();
    this.openAddEditForm(false);
  }

  editTerminal(att, i){
    this.terminal = Object.assign({}, att);
    this.openAddEditForm(true);
    this.index = i;
    // console.log(att,i)
  }

  submitTerminal(){
    this.loader = true;
    this.terminal.location_id = this.store.id;
    this.settingS.addStoreTerminal(this.terminal)
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(false, 'Terminal has been added');
        this.store.stores_terminals.push(res.result.data);
        this.terminal = new Terminal();
        this.openForm = false;
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Terminal has been not added');
      }
    ); 
  }

  updateTerminal(){
    this.loader = true;
    this.settingS.updateStoreTerminal(this.terminal)
    .then(
      res => {
        // console.log(res);
        this.sendEmitedData(false, 'Terminal has been updated');
        this.store.stores_terminals[this.index] = res.result.data;
        this.openForm = false;
      }
    ).catch(
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Terminal has been not updated');
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

  deleteTerminal(id, i){
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      if(result){
        Helpers.setLoading(true);
        this.archiveTeraminal(id, i)
      }
    });
    
  }

  archiveTeraminal(id, i) {
    this.settingS.deleteStroeTerminal(id).then(
      res => {
        this.sendEmitedData(false, 'Terminal has been deleted');
        this.store.stores_terminals.splice(i,1);
      }
    ).catch (
      err => {
        console.log(err);
        this.sendEmitedData(true, 'Something wrong! Terminal has been not deleted');
      }
    )
  }

}
