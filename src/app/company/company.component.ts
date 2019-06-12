import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../helpers';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from '../modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MetaService } from '../_services/meta.service';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit, OnDestroy {

  globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
  sub: Subscription[] = [];

  constructor(
    private _router: Router,
    private auth: AuthService,
    private metaS: MetaService
  ) {}

  ngOnInit() {
    Helpers.bodyClass(this.globalBodyClass);
    Helpers.removeScript('assets/js/home/home.js');
    Helpers.removeScript('assets/js/home/layout1.js');
    Helpers.removeCSS('assets/css/home/global.css');
    Helpers.removeCSS('assets/css/home/bootstrap.min.css');
    Helpers.removeCustomCSS('home-custom');
    this.addTages();

    this.loadJsPromise().then(
      res => {
        Helpers.setLoading(false);
      }
    );

    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        (<any>mLayout).closeMobileAsideMenuOffcanvas();
        (<any>mLayout).closeMobileHorMenuOffcanvas();
        Helpers.setLoading(true);
        (<any>$('[data-toggle="m-popover"]')).popover('hide');
      }
      if (route instanceof NavigationEnd) {
        (<any>mApp).init();
        (<any>mUtil).init();
        Helpers.setLoading(false);
      }

    });

    Helpers.removeCSS('assets/css/home/global.css');

    this.sub[0] = this.auth.checkLogin().subscribe(val => {
      if (!val) {
        this._router.navigate(['/auth/partner-login']);
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
      }
    });
  }

  ngOnDestroy() {
    this.sub.forEach(s => {
      s.unsubscribe();
    });
  }

  addTages() {
    this.metaS.setTitle('Rent My – We Power The Sharing Economy');
    const metaTag = [
      { name: 'twitter:title', content: 'Rent My – We Power The Sharing Economy' },
      { property: 'og:title', content: 'Rent My – We Power The Sharing Economy' },
      { property: 'og:url', content: 'https://rentmy.co/' }
    ];
    this.metaS.updateTags(metaTag);
  }

  private loadJsPromise() {
    return new Promise((resolve, reject) => {
      Helpers.setLoading(true);
      resolve();
    })
  }


}
