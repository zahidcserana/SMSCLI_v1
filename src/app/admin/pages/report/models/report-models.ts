
export class ReportServiceConfig {
    settings: any;
}

export class VoucherSearch {
    order_id: number;
    transaction_id: number;
    transaction_start: string;
    transaction_end: string;
    amount: string;
    amount_type: string;
}

export class SalesReport {
    name: string;
    email: string;
    date_start: string;
    date_end: string;
    location: number = null;
    terminal: number = null;
    transaction_type: string = null;
    payment_type: number = null;
    payment_status: number = null;
    order_status: number = null;
    coupon_code: string;
}

export class AccountReport {
    account_status: number = null;
    account_type: number = null;
    date_start: string;
    date_end: string;
}

export interface SalesReportList {
    id: number;
    created: string;
    total_quantity: number;
    status: string;
    sub_total: number;
    tax: number;
    total_discount: number
    total_deposit: number
    payments: SalesPayment;
}

export interface SalesPayment {
    id: number;
    order_id: number;
    type: number;
    payment_amount: number;
    payment_method: string;
    content_id: number
    terminal_id: number
    content_method: string;
}

