import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from "@angular/router";
import { getColor_settings } from "../home-modules/layout.config";

@Injectable({
  providedIn: "root"
})
export class LayoutStyleResolve implements Resolve<any> {
  constructor() {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let store;
    if (sessionStorage.getItem("online_store")) {
      this.setCssRule();
      store = sessionStorage.getItem("online_store");
    }
    return store;
  }

  setCssRule() {
    const css = this.getCss();
    const head = document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.type = "text/css";
    style.className = "home-custom";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

  getCss() {
    let layoutSettings: any;
    const store = JSON.parse(sessionStorage.getItem("online_store")).store;
    if (store && store.layout !== "")
      layoutSettings = JSON.parse(sessionStorage.getItem("online_store")).store
        .layout;
    const color_settings = getColor_settings(layoutSettings)
      ? getColor_settings(layoutSettings)
      : {};
    const css = `
        // #myCarousel2 .carousel-item a,
        // button,
        // .btn,
        // .theme-btn,
        // #search-body button { background-color: ${
          color_settings.theme_color
        }; border-color: ${color_settings.theme_color};}
        #myCarousel2 .carousel-item a:hover,
        // button:hover,
        .btn:hover,
        .theme-btn:hover,
        #search-body button:hover { background-color: ${
          color_settings.secondary_color
        } !important; border-color: ${
      color_settings.secondary_color
    } !important;}
        #headerCarousel h3{ color:${color_settings.secondary_color} }
        #headerCarousel h4{ color:${color_settings.theme_color} }
        // .nav-manu ul li a { color:${color_settings.theme_color} }
        .nav-manu ul li a:hover {color:${color_settings.theme_color} }
        // .nav-leftside ul li a {color:${color_settings.theme_color} }
        .innaerpage-title h2 { color:${color_settings.theme_color} }
        table tr th {color: ${color_settings.theme_color};}
        table tr td {color: ${color_settings.theme_color};}
        .termscondition-body h2 {
        color: ${color_settings.theme_color};}
        .featured-title {color: ${color_settings.theme_color};}
        #search-body button { background-color: ${
          color_settings.theme_color
        }; border-color: ${color_settings.theme_color};}
        .popular-section .nav-pills .nav-link.active,.popular-section .nav-pills .show>.nav-link { color: #fff !important; border-bottom: 2px solid ${
          color_settings.theme_color
        };
        }
        .home-mainproduct .nav-pills .nav-link.active:after,
        .home-mainproduct .nav-pills .show>.nav-link:after,
        .popular-section .nav-pills .nav-link.active:after,
        .popular-section .nav-pills .show>.nav-link:after {
        border-top: 8px solid ${color_settings.theme_color};
        }
        .home-mainproduct .nav-pills .nav-link.active,
        .home-mainproduct .nav-pills .show>.nav-link {
        color: #fff !important;
        border-bottom: 2px solid ${color_settings.theme_color};
        }
        .product-gallery-thumbnails .thumbnails-list li:first-child::before {
        background: ${color_settings.theme_color};
        }
        .cart-item {
        background-color: ${color_settings.theme_color} !important;
        }
        #myCarousel2 h4 {
        color:${color_settings.theme_color};
        }
        #myCarousel2 .carousel-item a  {
        background-color: ${color_settings.theme_color};
        }
        #myCarousel2 .carousel-item a:hover{ background-color: ${
          color_settings.secondary_color
        } !important; border-color: ${
      color_settings.secondary_color
    } !important;}

        .nav.nav-pills .nav-link, .nav.nav-tabs .nav-link {
        border-bottom: 2px solid ${color_settings.theme_color};
        }
        .product-cursol .carousel-control-next,
        .product-cursol .carousel-control-prev {
        background-color: ${color_settings.theme_color};
        }
        .single-shop h4{
        color:${color_settings.theme_color} !important;
        }
        .single-shop p{
            // color:${color_settings.secondary_color} !important;
        }
        .single-shop a{
            color:${color_settings.theme_color} !important;
        }
        .single-shop-3 {
        background-color: ${color_settings.primary_color} !important;
        }
        .contact-circle {
        background-color: ${color_settings.theme_color};
        }
        .form-control:focus {
        border: 1px solid ${color_settings.theme_color};
        }
        .single-shop-2 {
        background-color: ${color_settings.primary_color} !important;
        }
        .card-body h4 {
        color :${color_settings.theme_color}
        }
        .theme-btn {
        background-color: ${color_settings.theme_color}!important;
        border-color: ${color_settings.theme_color}!important
        }
        .theme-btn:hover {
            background-color: ${color_settings.secondary_color}!important;
        }
        .trms_condintion {
        color:${color_settings.theme_color}
        }

        .confirm-payment.step-block:after {
        background-color:  ${color_settings.theme_color}!important;
        }
        .confirm-billing.step-block:after {
        background-color:  ${color_settings.theme_color}!important;
        }
        .step-number {
        border-color:  ${color_settings.theme_color}!important;
        }
        .billing-address a {
        color:  ${color_settings.theme_color}!important;
        }
        .offer-area {
        background:${color_settings.offer_background_color}!important ;
        }
        .filter h3 {
        color: ${color_settings.theme_color} ;
        }
        .filter-search-result ul  li {
        background-color: ${color_settings.theme_color}!important;
        }
        ngb-pagination /deep/ .page-item.active .page-link{
            background-color: ${color_settings.theme_color}!important;
            color:${color_settings.theme_color}!important
        }
        .cp-name {
        color: ${color_settings.theme_color};
        }
        .footer-contact ul li i {
        color: ${color_settings.theme_color};
        }
        .single-shop-1{
        background-color: ${color_settings.primary_color}!important;
        }
        .m-btn--icon {background-color: ${color_settings.secondary_color};}
        .subscribe-btn {
        color: ${color_settings.theme_color};
        }
        .footer-devided {
        background-color: ${color_settings.secondary_color}!important;
        }
        .sk-circle .sk-child:before {
        background-color: ${color_settings.theme_color}!important;
        }
        .fa-loader {
        color: ${color_settings.theme_color}!important;
        }
        .cart-item {
        background-color: ${color_settings.theme_color};
        }
        .overlow {
        background-color: ${color_settings.product_overly};
        }

        .home-mainproduct .nav.nav-pills .nav-item, .nav.nav-tabs .nav-item {
        background-color: ${color_settings.theme_color}!important;
        }

        .nav.nav-pills .nav-link, .nav.nav-tabs .nav-link {
        background-color: ${color_settings.theme_color}!important;
        }
        .popular-section .nav-pills .nav-link.active,
        .popular-section .nav-pills .show>.nav-link {
        background-color: ${color_settings.theme_color}!important;
        }
        .product-cursol .carousel-control-next,
        .product-cursol .carousel-control-prev {
        background-color: ${color_settings.theme_color}!important;
        }
        .offer-circle {
        background: ${color_settings.secondary_color}
        }
        .offer-line {
        background: ${color_settings.secondary_color}
        }

        .page-title , .page-sub-tile {
        color:${color_settings.theme_color}!important;
        }
        .carousel-control-next,
        .carousel-control-prev {
        background: ${color_settings.theme_color}!important;
        }

        .custom-checkbox .custom-control-input:checked~.custom-control-label::before {
        background-color: ${color_settings.theme_color}!important;
        }
        .dropdown-item:hover , .inner-serch:hover  {
        background-color: ${color_settings.theme_color}!important;
        }
        .m-loader.m-loader--orange:before {
        border-top-color: ${color_settings.theme_color}!important;
        border-bottom-color: ${color_settings.theme_color}!important;
        }



        .contact-links-wrapper p:nth-child(1) {
        background: ${color_settings.theme_color}!important;
        }
        .intro-title {
        color: ${color_settings.theme_color}!important;
        }

        .contact-form-wrapper .form-control {
        background-color: ${color_settings.theme_color}!important;
        border-color: ${color_settings.theme_color}!important;
        }

        .btn-qty {
        background-color:${color_settings.theme_color}!important
        border-color: ${color_settings.theme_color}!important
        }
        .details-btn i {background-color: ${color_settings.theme_color};}
        .add_to_cart-btn i {background-color: ${color_settings.theme_color};}

        .details-btn:hover i {background-color: ${
          color_settings.secondary_color
        };}
        .add_to_cart-btn:hover i {background-color: ${
          color_settings.secondary_color
        };}

        .category-layout2 .details-btn {background-color: ${
          color_settings.theme_color
        };}
        .category-layout2 .add_to_cart-btn {background-color: ${
          color_settings.theme_color
        };}

        .category-layout2 .details-btn:hover {background-color: ${
          color_settings.secondary_color
        };}
        .category-layout2 .add_to_cart-btn:hover {background-color: ${
          color_settings.secondary_color
        };}

        .category-layout2 .details-btn i {background-color: transparent;}
        .category-layout2 .add_to_cart-btn i {background-color: transparent;}

        .category-layout2 .details-btn:hover i {background-color: transparent;}
        .category-layout2 .add_to_cart-btn:hover i {background-color: transparent;}

        // a:hover {color: ${color_settings.secondary_color};}
        .footer {background-color: ${color_settings.footer_background_color};}
            `;
    return css;
  }
}
