export class Features {
    id: number;
    name: string;
}

export class Plans {
    id: number;
    name: string;
    price_monthly: string;
    prince_yearly: string;
    icon: string;
    values: object[];
}

export const PlanList = [
    {
        id: 1, name: 'FREE',
        price_monthly: '0',
        price_yearly: '0',
        icon: 'flaticon-rocket'
    },
    {
        id: 2,
        name: 'SILVER',
        price_monthly: '40',
        price_yearly: '408',
        icon: 'flaticon-confetti'
    },
    {
        id: 3,
        name: 'PLATINUM',
        price_monthly: '90',
        price_yearly: '918',
        icon: 'flaticon-gift',
    }
];
export const FeatureList = [
    {
        id: 1,
        name: 'Number of items in inventory',
        values: [
            { name: '1-10' },
            { name: '11-50' },
            { name: 'Unlimited' }
        ]
    },
    // {
    //     id: 2, name: 'Per Month Orders',
    //     values: [
    //         { name: '10' },
    //         { name: '50' },
    //         { name: 'Unlimited' }
    //     ]
    // },
    {
        id: 3, name: 'Online Store',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 4, name: 'Wordpress Plugin/APIs',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 5, name: 'Real-time Rental Availability',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 6, name: 'Rentals & Sales',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 7, name: 'Shipping & Routing',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 8, name: 'Payments, Returns & Refunds',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 9, name: 'Product Variants(Sizes, Colors & More)',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 10, name: 'Serial, Barcode & Supplier ID Fields',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 11, name: 'Custom Fields',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 12, name: 'Credit Card Hardware Support',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 13, name: 'SMS Reminders & Receipts',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 14, name: 'Customer Database & Order History',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 15, name: 'Product Check-Out & Check-In',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    },
    {
        id: 16, name: 'Payment Gateway Integrations(Stripe, Paypal, Authorize.Net, CardConnect)',
        values: [
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' },
            { name: '<i class="la la-check"></i>' }
        ]
    }
    // {
    //     id: 17, name: 'Demo inventory contents',
    //     values: [
    //         { name: '<i class="la la-check"></i>&nbsp;upto 10 items' },
    //         { name: '<i class="la la-check"></i>&nbsp;upto 10-50 items' },
    //         { name: '<i class="la la-check"></i>&nbsp;Unlimited' }
    //     ]
    // },
    // {
    //     id: 18, name: 'User Limits and user permissions',
    //     values: [
    //         { name: 'Single User' },
    //         { name: '2 Users' },
    //         { name: '5 Users' }
    //     ]
    // },
    // {
    //     id: 19, name: 'Cash Register',
    //     values: [
    //         { name: '<i class="la la-close"></i>' },
    //         { name: '<i class="la la-close"></i>' },
    //         { name: '<i class="la la-check"></i>' }
    //     ]
    // },
    // {
    //     id: 20, name: 'Rental Calendar',
    //     values: [
    //         { name: '<i class="la la-close"></i>' },
    //         { name: '<i class="la la-check"></i>' },
    //         { name: '<i class="la la-check"></i>' }
    //     ]
    // },
    // {
    //     id: 21, name: 'Rental Reservations',
    //     values: [
    //         { name: '<i class="la la-close"></i>' },
    //         { name: '<i class="la la-close"></i>' },
    //         { name: '<i class="la la-check"></i>' }
    //     ]
    // },
    // {
    //     id: 22, name: 'Different Reports',
    //     values: [
    //         { name: '<i class="la la-close"></i>' },
    //         { name: '<i class="la la-check"></i>' },
    //         { name: '<i class="la la-check"></i>' }
    //     ]
    // }

];


export interface SubscriptionPlan {
    id: string;
    product_name: string;
    amount: string;
    product: string;
}

export interface CreditCard {
    id: String;
    brand: String;
    exp_month: number;
    exp_year: number;
    customer: string;
    last4: number;
    isDefault: boolean;
}
export interface BillingInfo {
    date: string;
    payment_type: string;
    invoice_id: string;
    currency: string;
    created: string;
    amount: string;
    charge_id: string;
    charge_status: string;
    seller_message: string;
}
export interface BillingDetails {
    id: string;
    amount_due: number;
    amount_paid: number;
    amount_remaining: string;
    billing_reason: string;
    currency: string;
    date: string;
    period_end: string;
    period_start: string;
    invoice_pdf: string;
    subtotal: number;
    total: number;
    number: any;
    paid: boolean;
    customer: string;
    product: Product;

}

export interface Product {
    amount: number;
    currency: string;
    description: string;
    id: string;
    period: Period;
    plan: Plan;
}
export interface Period {
    start: number;
    end: number;
}

export interface Plan {
    active: boolean;
    amount: number;
    billing_scheme: string;
    created: number;
    currency: string;
    id: string;
    interval: string;
    interval_count: number;
    nickname: string;
}
