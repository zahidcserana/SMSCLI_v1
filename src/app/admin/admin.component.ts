import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Helpers } from '../helpers';
import { GET_USER } from '../globals/_classes/functions';
import { MetaService } from '../_services/meta.service';
import { Subscription } from 'rxjs';
import { SidebarService } from './pages/sidebar-service/sidebar.service';
import { AuthService } from '../modules/auth/auth.service';
import { CartService } from './cart-service/cart.service';
import { logOutStore } from '../globals/endPoint/config';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./admin.component.html",
    styleUrls: ['./admin.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';

    sidebarOpen: boolean;
    sub: Subscription[] = [];
    loader: boolean;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.sidebarOpen) {
            const store = GET_USER().location_id;
            if (store) {
                this.sidebarS.openCartSidebar();
            }
        }
    }

    constructor(private _router: Router,
        private sidebarS: SidebarService,
        private cartS: CartService,
        private auth: AuthService,
        private metaS: MetaService) { }

    ngOnInit() {
        Helpers.removeScript('assets/js/home/home.js');
        Helpers.removeScript('assets/js/home/layout1.js');
        Helpers.removeCSS('assets/css/home/global.css');
        Helpers.removeCSS('assets/css/home/bootstrap.min.css');
        Helpers.removeCustomCSS('home-custom');

        this.addTages();
        this.sub[0] = this.sidebarS.sidebarOpen.subscribe(
            val => {
                this.sidebarOpen = val;
                this.sidebarS.closeCartSidebar();
            }
        );

        this.sub[1] = this._router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.sidebarOpen = false;
            }
        });

        this.loadJsPromise().then(
            res => {
                Helpers.setLoading(false);
            }
        );
        Helpers.bodyClass(this.globalBodyClass);

        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                (<any>mLayout).closeMobileAsideMenuOffcanvas();
                (<any>mLayout).closeMobileHorMenuOffcanvas();
                Helpers.setLoading(true);
                (<any>$('[data-toggle="m-popover"]')).popover('hide');
                (<any>$('[data-toggle="popover"]')).popover('hide');
                (<any>$('.popover')).popover('hide');
            }
            if (route instanceof NavigationEnd) {
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
            }

        });

        this.sub[2] = this.auth.checkLogin().subscribe(val => {
            if (!val) {
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                window.open(logOutStore + '/auth/login', "_self");
            }
        });
    }

    ngAfterViewInit() {
        this.closeSidebar();
    }

    ngOnDestroy() {
        this.sub.forEach(s => {
            s.unsubscribe();
        });
        if ($('.bacdrop-payment').hasClass('dis-block')) {
            this.cancelBolt();
        }
    }

    closeSidebar() {
        this.sidebarS.closeCartSidebar();
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

    cancelBolt() {
        this.loader = true;
        const data = {
            terminal_id: GET_USER().terminal_id
        };
        this.cartS.cancelBoltTerminal(true);
        this.cartS.cancelBolt(data).then(
            res => {
                console.log(res);
                this.cancel();
            }
        ).catch(
            err => {
                console.log(err);
                this.cancel();
            }
        );
    }

    cancel() {
        $('.bacdrop-payment').removeClass('dis-block');
        $('.bacdrop-payment').addClass('dis-none');
        this.loader = false;
    }

    private loadJsPromise() {
        return new Promise((resolve, reject) => {
            Helpers.setLoading(true);
            resolve();
        })
    }

}
