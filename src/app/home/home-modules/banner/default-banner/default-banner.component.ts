import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../../type.model';

@Component({
  selector: 'app-default-banner',
  templateUrl: './default-banner.component.html',
  styleUrls: ['./default-banner.component.css']
})
export class DefaultBannerComponent implements OnInit {

  @Input() data: Banner[];

  constructor() { }

  ngOnInit() {
   
  }


}
