import { Product } from './type.model';
import { product_image } from '../../globals/endPoint/config';
import { Banner1Component } from './banner/banner1/banner1.component';
import { Banner2Component } from './banner/banner2/banner2.component';
import { FeaturedLayout2Component } from './featured-products/featured-layout2/featured-layout2.component';
import { DefaultBannerComponent } from './banner/default-banner/default-banner.component';
import { DeafultFooterComponent } from './footer/deafult-footer/deafult-footer.component';
import { Footerlayout1Component } from './footer/footerlayout1/footerlayout1.component';
import { formatListPrice } from '../../globals/_classes/functions';


export const default_img = './assets/img/home/product-image-placeholder.jpg';
export const default_logo = './assets/img/home/default_logo.png';

export function getSingle_product(product: Product, layout_id) {
  const product_img = product.images.length && product.images[0].image_large ?
    `${product_image + getStoreId()}/${product.id}/${product.images[0].image_large}` : default_img;

  let layout = '';

  const price = product.prices[0] ? formatListPrice(product.prices[0]) : '';

  switch (Number(layout_id)) {
    case 1:
      layout = `<div class="category-product-box">
            <div class="category-img">
              <img class="transition" src="${product_img}">
              <div class="overlow transition">
                <a  class="button details-btn lbtn-sm lbtn-xsradius mrt-smallxs">
                  <i class="fa fa-search-plus"></i>
                </a>
                <button  class="button add_to_cart-btn lbtn-sm lbtn-xsradius mrt-smallxs"><i class="fa fa-shopping-bag"></i> </button>
              </div>
            </div>
            <div class="category-body">
              <h5 class="cp-name">${product.name}</h5>
              <h4 class="cp-price mrt-smallxs">${price}</h4>
            </div>
          </div>`;
      break;

    case 2:
      layout = `<div class="category-product-box category-layout2">
            <div class="category-img">
              <img class="transition" src="${product_img}">
              <div class="overlow transition">
                <a  class="button details-btn lbtn-sm lbtn-xsradius mrt-smallxs">
            <i class="fa fa-search-plus"></i> View Details
          </a>
                <a  class="button add_to_cart-btn lbtn-sm lbtn-xsradius mrt-smallxs"><i class="fa fa-shopping-cart"></i> Add Cart </a>
            </div>
            </div>
            <div class="category-body">
              <h5 class="cp-name">${product.name}</h5>
              <h4 class="cp-price mrt-smallxs">${price}</h4>
            </div>
          </div>`;
      break;
    case 0:
      layout = `<div class="category-product-box">
            <div class="category-img">
              <img class="transition"  src="${product_img}">
              <div class="overlow transition">
                <a  class="button details-btn lbtn-sm lbtn-xsradius mrt-smallxs">
                  <i class="fa fa-search-plus"></i>
                </a>
                <button  class="button add_to_cart-btn lbtn-sm lbtn-xsradius mrt-smallxs"><i class="fa fa-shopping-bag"></i> </button>
              </div>
            </div>
            <div class="category-body">
              <h5 class="cp-name">${product.name}</h5>
              <h4 class="cp-price mrt-smallxs">${price}</h4>
            </div>
          </div>`;
      break;
  }
  return layout;
}



export function getBannerSettings(layout_id) {
  let componentName: any;
  switch (layout_id) {
    case 1:
      componentName = Banner1Component;
      break;
    case 2:
      componentName = Banner2Component;
      break;
    case 0:
      componentName = DefaultBannerComponent;
      break;
  }
  return componentName;
}

export function getFooterSettings(layout_id) {
  let componentName: any;
  switch (layout_id) {
    case 1:
      componentName = Footerlayout1Component;
      break;
    case 2:
      componentName = Footerlayout1Component;
      break;
    case 0:
      componentName = DeafultFooterComponent;
      break;
  }
  return componentName;
}

export function getFeaturedLayout(layout_id) {
  let componentName: any;
  switch (layout_id) {
    case 1:
      componentName = FeaturedLayout2Component;
      break;
    case 2:
      componentName = FeaturedLayout2Component;
      break;
    case 0:
      componentName = FeaturedLayout2Component;
      break;
  }
  return componentName;
}

export function getColor_settings(settings) {
  const layout: any = settings;
  switch (Number(layout.layout_id)) {
    case 1:
      settings = layout.colorSettings;
      settings['product_overly'] = hexToRgbA(layout.colorSettings.theme_color);
      break;
    case 2:
      settings = layout.colorSettings;
      settings['product_overly'] = hexToRgbA(layout.colorSettings.theme_color);
      break;
    case 0:
      if(layout.colorSettings) {
        settings = layout.colorSettings;
        settings['product_overly'] = hexToRgbA(layout.colorSettings.theme_color);
      } else {
        settings = {
          primary_color: '#f2f3f8',
          secondary_color: '#555555',
          footer_background_color: '#444444',
          footer_background_img: '',
          // theme_btn_background: '#444',
          // theme_btn_color: '#fff',
          offer_background_color: '#444444',
          theme_color: '#444444',
          product_overly: hexToRgbA('#444444')
        };
      }
      
      break;
  }
  return settings;
}

export function getLogo() {
  const store_logo = getOnlineStore() ? getOnlineStore().store.logo : null;
  return store_logo ? store_logo : default_logo;
}

export function getStoreId() {
  return getOnlineStore() ? getOnlineStore().store.id : '';
}

export function getOnlineStore() {
  return sessionStorage.getItem('online_store') ? JSON.parse(sessionStorage.getItem('online_store')) : null;
}

export function hexToRgbA(hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');

    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',.3)';
  }
  throw new Error('Bad Hex');
}

export function bannerImage(bannerImage) {
  const { url } = Array.isArray(bannerImage) && bannerImage.length > 0 ? bannerImage[0] : bannerImage;
  return {
    'background-image': `url(${url})`,
    'background-repeat': 'no-repeat',
    'background-position': 'right center',
    'background-size': '100%'
  }
}
