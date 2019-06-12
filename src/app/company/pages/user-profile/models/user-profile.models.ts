export class UserProfile{
    id:number;
    first_name:string;
    last_name:string;
    avatar?:string;
    email:string;
    phone: string;
    mobile?: string;
    user_type_id: string = null;
    created?:string;
    status?:number = null;
    social_type?:string;
    addresses?:Address[];
    about?:string;
    primary_addres?:Address = new Address();
}

export class UserProfilelogin{
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

export class PartnerUserProfileServiceConfig {
    settings: any;
}
