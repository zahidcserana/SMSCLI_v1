import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-footerlayout1',
  templateUrl: './footerlayout1.component.html',
  styleUrls: ['./footerlayout1.component.css']
})
export class Footerlayout1Component implements OnInit {
  newsLetter: string;
  loading: boolean;
  message: string;

  @Input() contents;
  @Input() footer;
  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {}

  submit() {
    this.loading = true;
    this.http.post('newsletters', {email: this.newsLetter}).subscribe(
      res => {
        this.loading = false;
        if(res.status === 'OK') {
          this.newsLetter = null;
        }
        this.message = res.result.message ? res.result.message : res.result.error; 
        setTimeout(() => {
          this.message = null;
        }, 3000);
      },
      err => {
        this.loading = false;
        if(err.result) {
          this.message = err.result.message;
        } else {
          this.message = 'Sorry!!! Something went wrong.'
        }
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    );
  }

}
