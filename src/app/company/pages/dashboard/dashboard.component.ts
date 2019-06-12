import {Component, OnInit, ViewEncapsulation} from '@angular/core';


declare let $:any;

@Component({
  selector: 'app-blank',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    window.scrollTo(0,0);
  }




}