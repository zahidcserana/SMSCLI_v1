import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { map, debounceTime, distinctUntilChanged, switchMap, tap, catchError, retry } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from '../../../../modules/http-with-injector/http.service';



@Component({
  selector: 'search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

  params: string;
  searchedData = [];
  loader: boolean;
  sub: Subscription;
  searchText;


  constructor(
    private router: Router,
    private http: HttpService
  ) { }


  ngOnInit() {
    this.sub = this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        if (route.url.includes('product/search') || !route.url.includes('product')) {
          this.params = '';
        }
      }
    });
  }

  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { $('.home').click(); this.searchedData = []; this.loader = true; }),
      switchMap(term => {
        // console.log(term);
        return this.getProduct(term);
      }),
      tap(() => {
        this.loader = false;
        setTimeout(() => {
          $('.home .dropdown-menu.show .dropdown-item').unbind();
          const perId = $('.home .dropdown-menu.show').attr('id');
          var c = document.getElementById(perId).children;
          for (let j = 0; j < c.length; j++) {
            var id = c[j].getAttribute('id');
            var original = document.getElementById(id);
            var replacement = document.createElement('div');
            for (var i = 0, l = original.attributes.length; i < l; ++i) {
              var nodeName = original.attributes[i].name;
              var nodeValue = original.attributes[i].value;
              if (nodeName != 'type') {
                replacement.setAttribute(nodeName, nodeValue);
              }
            }
            replacement.innerHTML = `<div class='inner-serch' data-item='${this.searchedData[j].id}'>${this.searchedData[j].name}</div>`;
            original.parentNode.replaceChild(replacement, original);
          }
          $('.inner-serch').click((e) => {
            e.preventDefault();
            let id = $(e.target).data('item');
            const data = this.searchedData.find((f) => f.id == parseInt(id));
            this.gotoDetails(data);
          });
        }, 100);
      }),
    );
  }

  formatter = (x: { name: string }) => x.name;

  getProduct(params): any {
    if (!params && params === '') {
      this.loader = false
      return [];
    }
    // console.log(params);
    const search = 'search=' + params;
    return this.http.get(`products/search-product?${search}`).pipe(
      map(res => {
        this.searchedData = res.result.data;
        this.loader = false;
        this.searchText = null;
        setTimeout(() => {
          $('.home .dropdown-menu.show button').hover(() => {
            this.searchText = $('.home input').val();
          }, () => {
            this.searchText = $('.home input').val();
          });
        }, 100);
        return res.result.data.map((r) => r);
      }),
      retry(3),
      catchError(() => {
        this.loader = false;
        return [];
      })
    );
  }

  gotoDetails(e) {
    this.searchText = null;
    // console.log(e);
    if (e) {
      // this.service.parentList.next({ reload: true, id: e.uuid });
      this.router.navigate([`/product/${e.uuid}/${e.url}`]);
    }

  }

  goToSearchProduct(v) {
    let ser = '';
    if (v) {
      if (typeof v === 'object') {
        ser = v.name;
      } else {
        ser = v;
      }
    }
    if (this.searchText) {
      ser = this.searchText;
    }
    $('.home input').val(ser);
    // console.log(ser);
    if (ser) {
      this.searchText = null;
      this.router.navigate([`/product/search`], { queryParams: { params: ser } });
    }
  }

}
