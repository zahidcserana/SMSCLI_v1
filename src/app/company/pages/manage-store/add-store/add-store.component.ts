import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPoint } from '../../../../globals/endPoint/config';
import { checkFileSize } from '../../../../globals/_classes/functions';
import { StoreService } from '../store.service/store.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit, OnDestroy {

  storeForm: FormGroup;
  loading: boolean;
  unique: boolean;
  checking: boolean;
  message: boolean;
  sub: Subscription[] = [];
  edit: boolean;
  logo: string;
  url:string;
  storeId: number;
  tempLogo: string;
  htmlname = {
    header: '',
    submitBtn: ''
  };


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertS: AlertService,
    private storeS: StoreService
  ) { 
    this.createForm();
    this.getEditData();
    this.url = EndPoint + 'stores/'+ this.storeId + '/store-logo';
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    for (const s of this.sub) {
      s.unsubscribe();
    }
  }

  private getEditData() {
    this.sub[0] = this.route.data.subscribe(
      val => {
        console.log(val);
        this.edit = val.edit;
        if(this.edit) {
          this.storeId = +this.route.snapshot.paramMap.get('storeId');
          if(val.storeForm.status==='OK') {
            this.logo = this.storeS.checkLogo(val.storeForm.result.data.logo);
            this.storeForm.patchValue(val.storeForm.result.data);
            this.unique = true;
            console.log(this.storeForm.getRawValue());
          }
        }
        this.initHTMLNames();
      }
    );
  }

  private initHTMLNames() {
    this.htmlname.header = this.edit ? 'Edit Store' : 'Add Store';
    this.htmlname.submitBtn = this.edit ? 'Update Store' : 'Add Store';
  }

  createForm() {
    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      multi_location: [false],
      online_store: [false],
      status: [1]
    });
  }

  checkStoreName(pattern) {
    if(!pattern && this.storeName.value) {
      this.checking = true;
      // this.storeName.setValue((this.storeName.value).toLowerCase());
      this.storeS.checkStore({name: this.storeName.value})
      .subscribe(
        res => {
          console.log(this.storeName.value);
          this.checking = false;
          if(res.status == 'OK' && res.result.data.status==0) {
            this.unique = true;
            this.message = false;
          } else {
            console.log(this.storeName.value);
            this.unique = false;
            this.message = true;
          }
        },
        err => {
          this.checking = false;
          this.unique = false;
          this.message = false;
          console.log(err);
        }
      );
    }
  }

  submitStore() {
    this.loading = true;
    console.log(this.storeForm.getRawValue());
    this.storeS.addEditStore(this.storeForm.getRawValue(), this.storeId).then(
      res => {
        this.loading = false;
        console.log(res);
        if(res.status=='OK') {
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
          if(!this.edit) {
            setTimeout(() => {
              this.router.navigate(['/partner/store/list']);
            }, 2000);
          }       
        } else {
          this.alertS.error(this.alertContainer, res.result.error, true, 3000);
        }
      }
    ).catch(
      err => {
        this.loading = false;
        console.log(err);
        this.alertS.error(this.alertContainer, 'Something wrong!!! Please try again.', true, 3000);
      }
    );
  }

  uploadLogo(data){
    console.log(data);
    this.logo = data.status.result.logo;
    this.tempLogo = null;
    this.alertS.success(this.alertContainer, data.status.result.message, true, 3000);
  }

  changeLogo() {
    this.tempLogo = this.logo;
    this.logo = null;
  }

  cancelUpload() {
    this.logo = this.tempLogo;
    this.tempLogo = null;
  }
  
  get storeName() { return this.storeForm.get('name'); }

}
