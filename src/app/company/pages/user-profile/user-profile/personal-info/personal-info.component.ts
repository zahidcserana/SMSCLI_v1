import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Address, UserProfile } from '../../models/user-profile.models';
import { PartnerUserProfileService } from '../../user-profile.service/user-profile.service';



@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  add_address:boolean = false;
  edit:boolean = false;
  user: UserProfile = new UserProfile();
  addressList: Address[] = [];
  address: Address = new Address();
  user_id:number;
  index:number;
  loader:boolean;
  loaderA:boolean;


  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private alertS: AlertService,
    private userS: PartnerUserProfileService,
    private modalService: NgbModal
  ) {
      this.user_id = +this.route.parent.parent.parent.snapshot.paramMap.get('id');
      const data = this.route.snapshot.data['user'];
      this.user = data ? data.data : new UserProfile();
      if(!this.user.primary_addres) {
        this.user.primary_addres = this.address;
      }
      // console.log(this.user_id,this.user);
      this.addressList = this.user.addresses;
   }

  ngOnInit() {
    // this.addressList = address;
  }

  updateUserInfo(){
    this.loader = true;
    let user = Object.assign({}, this.user);
    delete user.addresses;
    // console.log(user);
    this.userS.updateUserInfo(this.user_id,user)
      .then(
        res=>{
          this.loader = false;
          this.userS.changeProfileStatus(this.user.status);
          this.alertS.success(this.alertContainer, "Data have been successfully updated", true,5000);
        },
        err=>{
          this.loader = false;
          console.log(err);
          this.alertS.error(this.alertContainer, err.error.result.error, true,5000);
        }
      );
  }

  initAddress(){ 
    this.add_address = true;
    this.edit = false;
    this.address = new Address();
    this.address.is_primary = false;
  }

  submitAddress(f){
    this.loaderA = true;
    // console.log(this.address);
    this.address['user_id'] = this.user_id;
    this.address.is_primary = this.address.is_primary? 1:null;
    this.userS.addUserAddress(this.address).then(
      res=>{
        // console.log(res);
        this.loaderA = false;
        this.alertS.success(this.alertContainer,'Data successfully added',true, 5000);
        this.addressList.push(this.address);
        this.closeAddress();
      },
      err=>{
        console.log(err);
        this.loaderA = false;
        this.alertS.error(this.alertContainer,err.error.result.message,true,5000);
      }
    );

  }

  closeAddress(){
    this.address = new Address();
    this.add_address = false;
  }

  editAddress(adr,i){
    this.add_address = true;
    this.edit = true;
    this.address = Object.assign({},adr);
    this.index = i;
    this.address.is_primary = this.address.is_primary==1? true:false;
  }

  updateAddress(){
    this.loaderA = true;
    let address = Object.assign({},this.address);
    delete address['id'];
    address.is_primary = address.is_primary? 1:null;
    // console.log(address);
    this.userS.updateUserAddress(this.address['id'],address).then(
      res=>{
        // console.log(res);
        this.loaderA = false;
        this.alertS.success(this.alertContainer,'Data successfully updated',true,5000);
        this.addressList[this.index] = this.address;
        this.closeAddress();
      },
      err=>{
        console.log(err);
        this.loaderA = false;
        this.alertS.error(this.alertContainer,err.error.result.message,true,5000);
      }
    );
  }

  deleteAddress(ad_id,i){
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      this.userS.deleteUserAddress(ad_id).then((res)=>{
        this.addressList.splice(i,1);
        // console.log(res);
        this.alertS.success(this.alertContainer, res.result.message, true, 5000);
      }),
      err=>{
        console.log(err);
        this.alertS.error(this.alertContainer, err.error.result.error, true, 5000);
      }
    }, (reason)=>{
      console.log(reason);
    });
  }

}
