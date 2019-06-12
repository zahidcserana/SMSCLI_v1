import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { GET_USER, changeUser } from '../../../globals/_classes/functions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-user-tour',
  templateUrl: './new-user-tour.component.html',
  styleUrls: ['./new-user-tour.component.css']
})
export class NewUserTourComponent implements OnInit {

  actualValue = [];
  types = [];
  grid = {s:1, c:12};
  url: string = environment.api_url;
  dontShow: boolean = GET_USER().setup;

  @HostListener('window:resize', ['$event']) 
  onResize(event) {
    this.formatValue();
  }

  constructor(private http: HttpService, private router: Router, private location: Location) { 
    const path = this.location.path();
    if(path.includes('?')) {
      this.location.replaceState(path.split('?')[0]);
    }
    this.getAllType();
  }

  ngOnInit() {
  }

  gotoList(id) {
    this.router.navigateByUrl(`/admin/bulk-demo-import/${id}`);
  }

  private getAllType() {
    this.http.get('setup/type').pipe( map( m => m.result.data), catchError( err => of([]))).subscribe(
      res => {
        this.actualValue = res;
        this.formatValue();
        // console.log(this.actualValue);
      }
    );
  }

  private formatValue() {
    const len = this.actualValue.length;
    this.grid = this.getScreenWidth();
    const slide = this.grid.s * 2;
    const size = len / slide;
    // console.log(this.grid, size)
    if(len > 0) {
      let obj = {};
      for (let i=0; i<size; i++) {
        obj[i] = this.actualValue.slice(i*slide, (i*slide) + slide);
      }
      this.types = Object.values(obj);
      // console.log(obj, this.types);
    }
  }

  private getScreenWidth () {
    const w = window.innerWidth;
    // console.log(w);
    switch (true) {
      case w > 1200:
        return {s:4, c:3};
      case 992 < w && w <= 1200:
        return {s:3, c:4};
      case 767 < w && w <= 992:
        return {s:2, c:6};
      default:
        return {s:1, c:12};
    }
  }

  doNotShow() {
    this.http.post('store-setup/' + GET_USER().store_id, {setup: this.dontShow}).toPromise().then(
      res => {
        if(res.status === 'OK') {
          changeUser('setup', this.dontShow);
        }
      }
    );
  }

}
