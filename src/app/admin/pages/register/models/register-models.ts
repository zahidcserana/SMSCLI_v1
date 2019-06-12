
export class RegisterServiceConfig {
    settings: any;
}

export class Register {
    id: number;
    type: string;
    denomination: Denomination[];
    date: string;
    user_id: number;
    terminal_id: number;
    location_id: number;
    total_amount: number;
    refund_amount: number;
    sales_amount: number;
}

export class Denomination {
    id: number;
    label: string;
    value: number;
    quantity: number;
    base?: number;
}

export class StoreInfo {
    user: string;
    store: string;
    terminal: string;
}

export class RegisterList {
    id: number;
    date_opened: string;
    date_closed: string;
    amount_open: number;
    amount_close: number;
    location_id: number;
    terminal_id: number;
    amount_net: number;
}

export class SearchRegister {
    location_id: string = '';
    terminal_id: string = '';
    date_start: string;
    date_end: string;
    amount_open: string;
    amount_close: string;
    amount_net: string;
    exclude_order: boolean;
}