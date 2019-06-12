

export interface Images {
    id?: number;
    image_original?: string;
    image_small?: string;
    status?: number;
    image_large?: string;
}
export interface Product {
    driving_license?: boolean;
    id: number;
    uuid?: number;
    name: string;
    sub_title?: string;
    description?: string;
    barcode?: any;
    quantity?: number;
    average_rating?: number;
    variant_list?: Variant[];
    variants?: Variant[];
    variant_set_list?: VariantSet[];
    variant_sets?: VariantSet[];
    prices: Price[];
    default_images?: Images[];
    images: Image[];
    img_url?: string;
    product_price?: Price;
    store_id: number;
    url: string;
    sales_tax?: number;
    deposit_amount?: number;
    deposite_tax?: string;
    show_rent_price?: boolean;
    products_availabilities: AvailableProduct[];
    default_variant: DefaultProperty;
    cart_quanity?: number;
    keyword: string;
    quantity_id: number;
    related_products?: Product[];
}

export interface Variant {
    selected?: boolean;
    id?: number;
    variant_set_id?: number;
    name: string;
    barcode?: string;
    quantity?: number;
    index?: number;
}

export interface DefaultProperty {
    barcode: string;
    quantity: Quantity;
    location?: string | number;
    deposit_amount?: number;
    deposit_tax?: boolean;
    sales_tax?: number;
    variant_chain_id?: string;
    variant_chain_name?: string;
    variants_products_id: number;
}
export interface VariantSet {
    id: number;
    name: string;
}
export interface Price {
    id?: number;
    variant_id?: number;
    price: number;
    product_id?: number;
    hourly: HourlyPrice[];
    daily: DailtPrice[];
    weekly: WeeklyPrice[];

}

export interface Image {
    id: number;
    product_id: number;
    image_large: string;
    image_small: string;
    status: number;
}

export interface RelatedProduct {
    id?: number;
    related_product_id?: number;
    product: Product;
}

export interface UserReview {
    id: number;
    user_id: number;
    review: string;
    rating: number;
    created: string;
    modified: string;
    user: User;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    image: string;
}

export interface Cart {
    sub_total: number;
    tax: number;
    user_id?: number;
    total: number;
    total_discount: number;
    total_quantity: number;
    deposit_amount: number;
    cart_items: CartItem[];
    shipping_method: number;
    delivery_charge: number;
    token?: string;
    pickup?: number;
}

export interface Quantity {
    id: number;
    quantity: number;
}

export interface CartItem {
    driving_license_required?: boolean;
    id: number;
    token?: string;
    product_id: number;
    quantity: number;
    price: number;
    product: Product;
    product_variant: DefaultProperty;
    rent_end: string;
    rent_start: string;
    rental_duration: string;
    variants: any;
    rental_type: string;
    term: number;
    sales_tax?: number;
    total: number;
    deposit_amount?: number;
    deposite_tax?: string;
    variants_products_id: string;
    variant_chain_name: string;
    variant_chain_id: string;
    sub_total: number;
    sales_tax_price: number;
}

// export interface DepositTax {
//     id: number;
//     key: string;
//     value: number;
//     product_id: number;

// }

export interface Category {
    id: number;
    name: string;
    url?: string;
    uuid?: string;
    total_product?: number;
    children: CategoryItem[];

}
export interface CategoryItem {
    id: number;
    name: string;
    url: string;
    uuid?: string;
    total_product?: number;
    children?: CategoryItem[];
    check?: boolean;
}

export class Tag {
    id: number;
    name: string;
    is_shown_in_nav: boolean;
    url: string;
}

export interface HourlyPrice {
    price: number;
    duration: number;
}
export interface DailtPrice {
    price: number;
    duration: number;
}
export interface WeeklyPrice {
    price: number;
    duration: number;
}
export interface AvailableProduct {
    start_date: string;
    end_date: string;
    quantity: number;
    id?: number;
    product_id?: number;
}
export interface Coupon {
    unit_type: number; // 1 = percent 2 = usd
    id?: number;
    code: string;
    amount: number;
    set_coupon?: boolean;
}
export interface BreadCrumb {
    name: string;
    id: number;
    url: string;
    uuid?: string;
    type: string;
    search_url?: String;
    page_no?: number;
}
export interface BillingIfo {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    address_line1: string;
    city: string;
    state_id: string;
    zipcode: string;
    company_name: string;
    alt_phone: string;
    event_location: string;
    salesman: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zipcode: string;
    shipping_address: string;
    special_instructions: string;
    special_requests: string;

}

export interface ShippingMethod {
    id: number;
    shipping_location: string;
    shipping_cost: number;
    selected?: boolean;
    change?: boolean;
}

export interface Store {
    is_online: boolean;
    name: string;
    selected: boolean;
    id: number;
}
export interface Order {
    id: number;
}

export interface Payment {
    id?: number;
    order_id: number;
    type: string;
    payment_method?: string;
    payment_amount: number;
    transaction_id?: number;
    note?: string;
    response_text?: string;
}

export interface Banner {
    title: String;
    sub_title: String;
    text: String;
    btn_text: string;
    btn_link: string;
}

export interface Content {
    banner: ContentData[];
    grid: ContentData[];
    homeContent: ContentData[];
}
export interface ContentData {
    text?: string;
    id: number;
    url?: string;
    label?: String;
    link?: String;

}

export class Page {
  name: string = 'Page';
  slug: string = '';
  contents: any = 'Please Add Your Content';
  meta_description: string = '';
  meta_keyword: string = '';
  heading: string = "Page";
}
