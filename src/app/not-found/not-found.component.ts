import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  @HostBinding('style.height') height = '100%';

  constructor() { }

  ngOnInit() {
  }

}
