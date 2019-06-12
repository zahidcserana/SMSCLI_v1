import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input('rating') rating:any;
  @Input('readonly') readonly:boolean;

  constructor() { }

  ngOnInit() {
  }

}
