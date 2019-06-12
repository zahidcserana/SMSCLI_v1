import { GET_STORE_ID } from "../../../../globals/_classes/functions";

export class SettingsServiceConfig {
    settings: any;
}

export class VariantSet {
    id?: number;
    store_id: number = GET_STORE_ID();
    name: string;
    variants: Variant[] = [];
    slug: string;
}

export class Variant {
    id?: number;
    variant_set_id?: number;
    name: string;
}

export class Tag {
    id: number;
    name: string;
    is_shown_in_nav: boolean;
}

export class Coupon {
    id: number;
    code: string;
    start_time: string;
    end_time: string;
    unit_type: number = 1;
    amount: number;
    status: boolean;
}

export class Stores {
    id?: number;
    name: string;
    status: string = null;
    stores_terminals: Terminal[];
    is_online: boolean = false;
}

export class Account {
    id?: number;
    type: number;
    amount: number;
    status: string = null;
    description: string = null;
}

export class Terminal {
    id?: number;
    name: string;
    hsn: string;
    status: string = null;
    location_id: number;
}

export class Supplier {
    id?: number;
    name: string;
    email: string;
    phone: string;
    class_id: number;
}

export class Classes{
    id: number;
    text: string;
}

export class Gateway {
    id?: number;
    name: string;
    config: Object = {}; 
    status: number;
    is_online: boolean;
}

export class AccountReport {
    income: number;
    expenditure: number;
    net: number;
}

export class Accounts {
    id?: number;
    type: number;
    amount: number;
    status: number;
    description: string = null;
}

export class Shipping {
    id?: number;
    name: string;
    config: any;
    status: number = 1;
}
