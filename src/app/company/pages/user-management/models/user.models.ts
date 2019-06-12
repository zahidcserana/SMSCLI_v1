export class User{
    id? : number;
    first_name: string;
    last_name: string;
    avatar?: string;
    email: string;
    phone: string;
    user_type_id: string = null;
    created?: string;
    status?: number = null;
    social_type?: string;
    addresses?: Address[];
    about?: string;
    image?: string;
    primary_addres?: Address = new Address();
    plan_period?: string;
    account_type?: string;
}

export class User_login{
    name:string;
    token:string;
    user_id:number;
    user_type_id:number;
    email:string;
    image:string;
    location_id: number;
    terminal_id: number;
}

export class Address{
    type:string;
    address_line1: string;
    city?:string;
    state?:string;
    phone?: string;
    mobile?: string;
    zipcode?:number;
    country?:string; 
    is_primary?:boolean | number;   
}

export class PartnerUserServiceConfig {
    settings: any;
}

export class UserSearch{
    name: string;
    email: string;
    plan_period: string = '';
    status: number = null;
    account_type: string = '';
    created: string;
    user_type_id: string = null;
}

export class UserSignUp {
    first_name:string;
    last_name: string;
    email:string;
    password:string;
    user_type_id: any = 3;
    send_email: boolean;
}

export interface BillingInfo {
    transaction_id?: string;
    created?: string;
    amount?: number;
    charge_status?: string;
    seller_message?: string;
}

export interface Store {
    name: string;
    multi_location: boolean;
    online_store: boolean;
    status: number;
  }
