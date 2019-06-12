import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rental-calender',
  templateUrl: './rental-calender.component.html',
  styleUrls: ['./rental-calender.component.css']
})
export class RentalCalenderComponent implements OnInit {

  status: string = 'pickup';

  constructor() { }

  ngOnInit() {
  }



}
