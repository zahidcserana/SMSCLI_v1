import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { storeHoshName } from '../../../../../../globals/endPoint/config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../../modules/alert/alert.service';
import { PartnerUserService } from '../../../user.service/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddUserStoreComponent implements OnInit {

  domain = storeHoshName;
  unique: boolean;
  checking: boolean;
  duplicate: boolean;
  storeForm: FormGroup;
  loading: boolean;
  storeName: string;
  user_id: number;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertS: AlertService,
    private userS: PartnerUserService
  ) { 
    this.user_id = +this.route.parent.parent.parent.parent.snapshot.paramMap.get('user_id');
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.storeForm = this.fb.group({
      slug: ['', Validators.required],
      status: [1],
    });
  }

  checkStoreName() {
    this.checking = true;
    this.userS.checkStore({slug: this.storeSlug.value, register: true})
      .then(
        res => {
          // console.log(res);
          this.checking = false;
          if(res.status == 'OK' && res.result.data.status==0) {
            this.storeName = res.result.data.store_name;
            this.unique = true;
            this.duplicate = false;
          } else {
            this.storeName = null;
            this.unique = false;
            this.duplicate = true;
          }
        },
        err => this.errorCheck(err)
      ).catch (
        err => {
          this.errorCheck(err);
        }
      )
  }

  private errorCheck(err) {
    this.storeName = null;
    this.checking = false;
    this.unique = false;
    this.duplicate = false;
    console.log(err);
  }

  get storeSlug() { return this.storeForm.get('slug'); }

  submitStore() {
    const sendData = {
      ...this.storeForm.value,
      user_id: this.user_id,
      name: this.storeName
    } 
    this.loading = true;
    this.userS.storeCtreate(sendData).then(
      res => {
        this.loading = false;
        if(res.status=='OK') {
          this.alertS.success(this.alertContainer, res.result.message, true, 3000);
          setTimeout(() => {
            this.router.navigateByUrl(`/partner/users/${this.user_id}/stores`);
          }, 2000);      
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

}
