

export class AttributeSet {
    text? : string;
    id?: number;
    name?: string;
    variants?: Attributes[];
}

export class Attributes {
    id?: number; name: string; variant_set_id?: number;
}

export class SideBar_Related_Product{
    id: number;
    name: string;
    images: any[];
}

export class Images {
    id?: number;
    image_original?: string;
    image_small?: string;
    status?: number;
    image_large?: string;
}

export class CategoryList {
    id?: number;
    category_id: number;
    category_chain: string;
}

export class ProductPrice {
    id?: number;
    price?: string;
    hourly_price?: string;
    hourly_duration?: number;
    daily_price?: string;
    daily_duration?: number;
    weekly_price?: string;
    weekly_duration?: number;
}

export class ProductPricInfo {
    id?: number;
    purchase_date: string;
    sales_tax?: string;
    deposit_amount?: number; 
    cost?: string;
    deposit_tax: boolean = false;
    ldw_tax?: number;
}

export class ReserveDate {
    id: number;
    product_id: number;
    start_date: string;
    end_date: string;
    order_id: number = null;
    quantity: number;
}


export class AttributManage {
    id: number;
    ids: number[];
    attribute_set: any[];
    barcode: string = '';
    location: LocationQty[];
    default: boolean;
    weight_amount?: number;
    weight_unit?: string = 'pound';
}

export interface Location {
    id: number;
    name: string;
}

export class LocationQty {
    id: number;
    name: string;
    quantity: number = 0;
}

export interface AttributeList {
    id: string;
    chain: string;
    location: number[];
}
