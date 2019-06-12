import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../../register.service/register.service';

@Component({
  selector: 'app-detials',
  templateUrl: './detials.component.html',
  styleUrls: ['./detials.component.css']
})
export class DetialsComponent implements OnInit {

  log = [];
  loader: boolean;

  @Input('stores') stores: any[];
  @Input('terminals') terminals: any[];
  @Input('qData') qData;

  constructor(private registerS: RegisterService, public activeModal: NgbActiveModal){}

  ngOnInit() {
    // console.log(this.stores, this.terminals, this.qData);
    this.loader = true;
    this.registerS.getDetails(this.qData).subscribe(
      res => {
        this.log = res.data;
        // console.log(this.log);
        this.loader = false;
      },
      err => console.log(err)
    );
  }

  getDate(d) {
    if(d) {
        return new Date(d);
    }
    return '';
  }

  getStore(id) {
    const s = this.stores.find(f => f.id == id);
    if(s) {
      return s.store_name;
    }
    return '';
  }

  getTerminal(id) {
    const s = this.terminals.find(f => f.id==id);
    if(s) {
      return s.name;
    }
    return '';
  }

  

}
