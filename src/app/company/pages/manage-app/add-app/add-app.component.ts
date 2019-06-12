import { AlertService } from './../../../../modules/alert/alert.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyAppService } from '../company-app.service/company-app.service';


@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})
export class AddAppComponent implements OnInit, OnDestroy {

  appForm: FormGroup;
  loading: boolean;
  sub: Subscription[] = [];
  edit: boolean;
  appId: number;
  htmlname = {
    header: '',
    submitBtn: ''
  };
  allStore = [];


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertS: AlertService,
    private appS: CompanyAppService
  ) { 
    this.createForm();
    this.getStorList();
    this.getEditData();
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
          this.storeId.disable();
          this.appId = +this.route.snapshot.paramMap.get('appId');
          if(val.appForm.status==='OK') {
            this.appForm.patchValue(val.appForm.result.data);
            console.log(this.appForm.getRawValue());
          }
        } else {
          this.storeId.enable();
        }
        this.initHTMLNames();
      }
    );
  }

  private getStorList() {
    this.appS.getAllStore().subscribe(
      res => {
        console.log(res);
        if(res.status === 'OK') {
          this.allStore = res.result.data;
        }
      }, err => console.log(err)
    );
  }

  private initHTMLNames() {
    this.htmlname.header = this.edit ? 'Edit App' : 'Add App';
    this.htmlname.submitBtn = this.edit ? 'Update App' : 'Add App';
  }

  createForm() {
    this.appForm = this.fb.group({
      app_name: ['', Validators.required],
      site_url: ['', Validators.required],
      store_id: [0, Validators.required]
    });
  }

  submitApp() {
    this.loading = true;
    console.log(this.appForm.getRawValue());
    this.appS.addEditApp(this.appForm.getRawValue(), this.appId).then(
      res => {
        this.loading = false;
        console.log(res);
        if(res.status=='OK') {
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
          if(!this.edit) {
            setTimeout(() => {
              this.router.navigate(['/partner/app/list']);
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
  
  get appName() { return this.appForm.get('app_name'); }
  get siteUrl() { return this.appForm.get('site_url'); }
  get storeId() { return this.appForm.get('store_id'); }

}
