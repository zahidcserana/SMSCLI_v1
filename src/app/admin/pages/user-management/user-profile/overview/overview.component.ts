import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service/user.service';

const feed=[
  {id:1514,type_action:'login-success',content_id:712,ip:'103.123.56.62',os:'Android',browser:'Chorme',device:'Mobile',date:'5/15/18 13:22'},
  {id:1515,type_action:'login-reject',content_id:712,ip:'103.123.56.62',os:'Android',browser:'Handheld',device:'Mobile',date:'5/15/18 13:22'}
]

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  feeds = feed;
  userId:number;
  user_info;
  cards;

  constructor(
    private router: Router, private route:ActivatedRoute,
    private userS:UserService
  ) {
    // console.log(this.route.parent.parent.snapshot.params['user_id']);
    this.userId = this.route.parent.parent.snapshot.params['user_id'];
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this.user_info = this.route.snapshot.data['user_info'].data;
    this.user_info = this.userS.formateUser(this.user_info);
    this.getCards();
  }

  goToPersonalInfo(){
    // console.log(this.userId);
    this.router.navigate(["admin/user/"+this.userId+"/account-settings"]);
  }

  getCards(){
    this.userS.getCardTotal(this.userId).subscribe(
      res=>{
        // console.log(res);
        this.cards = res.data;
      },
      err => console.log(err)
    );
  }

  findUserType(data){
    return this.userS.findUserType(data);
  }

  checkStatus(data){
    return this.userS.checkStatus(data);
  }

  getText(t) {
    if(t) {
      return t.replace(/<(?:.|\n)*?>/gm, '');
    }
    return '';
  }


}
