import { product_image } from "../../../globals/endPoint/config";
import { Product } from "../type.model";
import { getQtyFromCartList, getQtyFromProductList, formateRentType } from "../../../globals/_classes/functions";

declare let $: any;

export abstract class ProductDetailsLayout {
    details: Product;
    store = JSON.parse(sessionStorage.getItem('online_store')).store.id;
    images = [];
    featureImage = null;
    defaultImage = '';
    prices = {buy: {type: false, price: 0}, rent:{type: false, price: []}};
    total = {
        qty: 1,
        price: 0
    }
    private cart = {
        deposit_amount: 0,
        deposite_tax: '',
        driving_license_required: false,
        price: 0,
        product_id: 0,
        quantity: 0,
        variants_products_id: null,
        location: null,
        rent_start: '',
        rental_duration: 0,
        rental_type: '',
        sales_tax: 0,
        term: '',
        token: ''
    };
    baseRadio: number;
    available: number;
    rentelPriceId: number;
    cartList;

    constructor () {}

    load() {
        this.imageFormat();
        this.formatVariant();
        this.defaultImage = this.images[0] ? this.images[0].lg_feature : './assets/img/home/product-image-placeholder.jpg';
        this.prices = this.formatBuyRent(this.details.prices);
        this.initPrice();
    }

    changeFeatureImage (i) {
        this.featureImage = this.images[i].lg_feature;
    }

    changeBuyRent (v) {
        if (v === 'buy') {
            this.baseRadio = 1;
            this.changeOnBuy();
        } else {
            this.baseRadio = 2;
            this.changeRent(1);
        }
    }

    changeRent (v) {
        this.rentelPriceId = v;
        this.changeOnRent(v); 
    }

    increaseQty () {
        if (this.total.qty < this.available) {
            this.total.qty++;
            this.setTotalPrice();
        }
    }

    decreaseQty () {
        if (this.total.qty > 1) {
            this.total.qty--;
            this.setTotalPrice();
        }
    }

    private getQtyFromCart(date, duration) {
        const cartList = localStorage.getItem('user_cart') ? JSON.parse(localStorage.getItem('user_cart')) : null;
        const cartQty = cartList ? getQtyFromCartList(cartList.cart_items, this.details, date, duration) : 0;
        const availableQty = this.details.products_availabilities ? getQtyFromProductList(this.details.products_availabilities, date, duration) : 0;
        return cartQty + availableQty;
    }

    private checkAvailableForType() {
        if(this.cart.rental_type == 'hourly') {
            return this.getQtyFromCart(this.cart.rent_start, 1);
        } else if(this.cart.rental_type == 'weekly') {
            return this.getQtyFromCart(this.cart.rent_start, (+this.cart.term) * 7);
        } else if(this.cart.rental_type == 'daily') {
            return this.getQtyFromCart(this.cart.rent_start, +this.cart.term);
        }
        return this.getQtyFromCart(new Date(), 14);
    }

    checkAvailabe() {
        const dqty = this.details.default_variant.quantity.quantity;
        const a = dqty - this.checkAvailableForType();
        this.available = a < 0 ? 0 : a;
        this.total.qty = this.available > -1 ? 1 : 0;
        this.setTotalPrice();
        // console.log(this.available, this.total.qty )
    }
 
    private initPrice () {
        if(this.prices && Object.keys(this.prices).length>0) {
            if(this.prices.buy.type) {
                if(this.baseRadio && this.baseRadio===2 && this.prices.rent.type) {
                    this.baseRadio = 2;
                    this.changeRent(1);
                } else {
                    this.baseRadio = 1;
                    this.changeOnBuy();
                }
            } else if(this.prices.rent.type) {
                this.baseRadio = 2;
                this.changeRent(1);
            }
        } else {
            this.total.qty = 0;
        }
    }

    private imageFormat () {
        if(this.details && this.details.images.length > 0) {
            this.images = this.details.images.sort( (a, b) => {
                return b.status - a.status;
            }).map (m => {
                m['lg_feature'] = `${product_image}${this.store}/${this.details.id}/${m.image_large}`;
                m['sm_feature'] = `${product_image}${this.store}/${this.details.id}/${m.image_small}`;
                return m;
            });

            this.featureImage = this.images[0].lg_feature;
        }
    }


    private setTotalPrice() {
        this.total.price = this.cart.price * this.total.qty;
    }

    SelectRentalDate(e) {
        this.cart.rent_start =  e + this.getTime(); 
        this.checkAvailabe();
    }

    private getTime() {
        var now = new Date();
        var hour = ("0" + now.getHours()).slice(-2);
        var min = ("0" + (now.getMinutes())).slice(-2);
        return ' ' + hour + ':' + min + ':00';
    }

    private changeOnRent(id) {
        const rentObj = this.prices.rent.price.find (f => f.id === id);
        this.cart.price = rentObj.price;
        this.cart.rental_type =  rentObj.type;
        this.cart.term =  rentObj.duration;
        this.cart.rent_start =  this.getDate();
        this.cart.rental_duration = 1;
        this.cart.deposit_amount =  this.details.deposit_amount;
        this.cart.deposite_tax =  this.details.deposite_tax;
        this.cart.driving_license_required =  this.details.driving_license;
        this.checkAvailabe();
    }

    private changeOnBuy() {
        this.cart.price = this.prices.buy.price;
        this.cart.deposit_amount =  0;
        this.cart.deposite_tax =  '';
        this.cart.rent_start =  '';
        this.cart.rental_duration =  0;
        this.cart.rental_type =  'buy';
        this.cart.term =  '';
        this.checkAvailabe();
    }

    private formatBuyRent(data) {
        if(data.length>0) {
            var prices = data[0];
            var obj = {buy: {type: false, price: 0}, rent:{type: false, price: []}};
            var rent = ['hourly', 'daily', 'weekly'];
            if(prices.price > 0) {
                obj.buy['type'] = true;
            }
            obj.buy['price'] = prices.price;
            let id = 0;
            for(var i=0; i<rent.length; i++) {
                var t = rent[i];
                if(prices[t].length > 0) {
                    var r = prices[t];
                    for(var j=0; j<r.length; j++) {
                        r[j]['type'] = t;
                        r[j]['id'] = ++id;
                        r[j]['duration'] = r[j]['duration'] ? r[j]['duration'] : 1;
                        obj.rent['price'].push(r[j]);
                    }
                }
            }
            if(obj.rent['price'].length>0) obj.rent['type'] = true;
            // console.log(obj);
            return obj;
        }
        return this.prices;
    }

    getType(key, t) {
        return formateRentType(key, t);
    }

    // ****************************** Variant*************************

    changeVariantCall (pos, id) {
        // console.log(pos, id);
        let chain = ''
        if(parseInt(id) > 0) {
            if(parseInt(pos) > 0) {
                chain = $('.select-variant .variant-chain-select').map(function() {
                    return jQuery(this).val();
                }).get().slice(0,-1).join(',');
            }
            // console.log(id, chain)
            for(let a of this.details.variant_set_list[pos]['variants']) {
                if(a.id == parseInt(id)) {
                    a.selected = true;
                } else {
                    a.selected = false;
                }
            }
            if(pos + 1 === this.details.variant_set_list.length) {
                return {id: id, chain: chain};
            } else {
                return {id: id, chain: chain, pos: pos};
            }
        }
    }


    private formatVariant() {
        if(this.details.variant_set_list.length>0) {
            this.details.variant_set_list = this.details.variant_set_list.map( function(f) {
                f['variants'] = [];
                return f;
            });
            this.details.variant_list.sort( (a, b) => a.selected ? -1 : 0);
            this.formatVariantSetList(this.details.variant_list);
        }
    }

    private formatVariantSetList(vValue) {
        for(const i of vValue) {
            const ind = this.details.variant_set_list.findIndex( f => f.id === i.variant_set_id);
            if(ind > -1) {
                this.details.variant_set_list[ind]['variants'].push(i);
            }
        }
    }

    private formatVariantList(pos) {
        for(let j=0; j< this.details.variant_set_list.length; j++) {
            if(j>pos) {
                this.details.variant_set_list[j]['variants'] = [];
            } 
        }
    }

    variantChainRes (res, data) {
        this.formatVariantList(data.pos);
        res.splice(0,0, {
            id: 0,
            name: '-Select One-',
            variant_set_id: this.details.variant_set_list[data.pos + 1].id
        });
        this.formatVariantSetList(res);

    }

    getLastvariantChainCall (res) {
        this.details.images = res.images;
        this.details.prices = res.prices;
        this.details.default_variant = res.variant;
        this.details.products_availabilities = res.products_availabilities;
        this.imageFormat();
        this.prices = this.formatBuyRent(this.details.prices);
        this.initPrice();
    }

    addCartObj () {
        if(this.cart.rental_type !== 'buy') {
            this.cart.rent_start = this.cart.rent_start ? this.cart.rent_start : this.getDate();
        }
        this.cart.product_id = this.details.id;
        this.cart.quantity = this.total.qty;
        this.cart.variants_products_id = this.details.default_variant.variants_products_id ? this.details.default_variant.variants_products_id : '';
        this.cart.location = sessionStorage.getItem('online_store') ? JSON.parse(sessionStorage.getItem('online_store')).location.id : '',
        this.cart.sales_tax = this.details.sales_tax;
        const token = localStorage.getItem('token');
        this.cart.token = token ? token : '';
        return this.cart;
    }

    private getDate() {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear()+"-"+(month)+"-"+(day) + this.getTime();
        return today;
    }

    get diabledAddtoCart() {
        const chain = $('.select-variant .variant-chain-select').map(function() {
            return jQuery(this).val();
        }).get();

        if(!chain.includes('0') && this.total.qty > 0) {
            return true;
        }
        return false;
    }

}