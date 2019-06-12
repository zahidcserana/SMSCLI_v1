import { Component, OnInit } from '@angular/core';
import {ContentResoveService} from '../../home-service/contetn-resolve.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
    promotions ;
    constructor(private service: ContentResoveService) {
        this.promotions = this.service.contents && this.service.contents.site_specific.home_page_promotion ? this.service.contents.site_specific.home_page_promotion : {};
    }


  ngOnInit() {
  }

}
