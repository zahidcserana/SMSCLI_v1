export interface Store {
    name: string;
    multi_location: boolean;
    online_store: boolean;
    status: number;
}

export class StoreServiceConfig {
    settings: any;
}