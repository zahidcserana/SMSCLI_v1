export class OrderSearch {
    name: string;
    email: string;
    phone: string;
    address: string;
    order_type: string = null;
    id: string;
    created: string;
    salesman: string = null;
    payment_type: string = null;
    status: string = null;
    location: string = null;
}

export class OrderServiceConfig {
    settings: any;
}

export class Order {
    id: number;
    name: string;
    country: string;
    created: string;
    delivery_charge: number;
    delivery_date: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    tax: number;
    status: number;
    vat: number;
    total_discount: number;
    total_price: number;
    total_quantity: number;
    total_deposit: number;
    pickup: string;
    sub_total: number;
    coupon: Coupon;
    total: number;
    delivery_tax?: any;
}

export class Coupon {
    id: number;
    code: string;
    amount: number;
}

export class Customer {
    first_name: string;
    last_name: string;
    country_id: string;
    phone: string;
    mobile: string;
    email: string;
    address_line1: string;
    city: string;
    state_id: string;
    zipcode: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_mobile: string;
    shipping_address1: string;
    shipping_address2: string;
    shipping_city: string;
    shipping_zipcode: string;
}

export class Payment {
    id?: number;
    order_id: number;
    type?: number = 2;
    payment_method?: string = null;
    payment_amount: number = 0.00;
    note?: string;
    content_id: number = 4;
    content_method?: string;
    transaction_id?: number;
}

export class Item {
    order_id: number;
    product_id: number;
    price: number;
    quantity: number;
    rent_start: string;
    rental_duration: number;
    rental_type: string;
    term: number;
    sales_tax: string;
    deposit_amount:number;
    deposite_tax: number;
    variants_products_id: number;
    location: number;
}

export class Methods {
    total_amount: number;
    payment_method: any[]
}