

export interface ProductList{
    data:ProductListData;
    categories?:{}
}

export interface ProductListData{
    id: number;
    name: string;
    user_id: number;
    sub_title: string;
    description: string;
    supplier_id: number;
    quantity: number;
    sales_tax: number;
    idw_tax: number;
    barcode: string;
    minimum_rental_period: number;
    deposit_required: null;
    deposit_amount: number;
    creator_name: string;
    creator_email: string;
    price_id: number;
    price: number;
    hourly_status: boolean;
    daily_status: boolean;
    weekly_status: boolean;
    hourly_price: number;
    daily_price: number;
    weekly_price: number;
    category_id: number;
    category_name: string;
    supplier_name: string;
    check: boolean;
}

export class InventoryServiceConfig {
    settings: any;
}

export class ProductServiceConfig {
    settings: any;
}

export class Descriptuion{
    id?:number;
    batch?:number;
    phone?:string;
    uid?:string;
    class_roll?:string;
    name: string;
    sid: string;
    email: string;
    address: string;
    mobile: string;
    sections?: any[];
    class_id?: number;
    section_id?: number;
    classes?: any[];
    status?: number = 2;
}

export class Supplier{
    id:number;
    text:string;
}

export class Classes{
    id:number;
    text:string;
}

export class Sections{
    id:number;
    text:string;
}

export class ProductSearch{
    name:string;
    email:string = '';
    status:string = '';
    mobile:string = '';
    class_id:number;
    section_id:number;
    student_id:number;
    batch:number;
}

export class OrderItem {
    product_id: number;
    store_id: number;
    user_id: number;
    attributes: any;
    price: number;
    quantity: number;
    rent_start: string;
    rent_end: string;
    rental_duration: number;
    rental_type: string;
    term: number;
    sales_tax: string;
    deposit_amount: number;
    deposite_tax: string;
}

export class OrderCustomer {
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
    status: number;
}

export class ProdyctQty {
    product_id: number;
    chain_name: string;
    chain: string;
    imgae: string;
    location_data: Location[];
    barcode: string;
    supplier_name: string;
    cost: string;
    purchase_date: string;
}

export class Location {
    attributes_products_id: number;
    location: number;
    quantity: number;
}