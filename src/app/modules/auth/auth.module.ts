import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';


export interface UserData {
    user_id: number;
    name: string;
    email: string;
    token: string;
    location_id: string;
    terminal_id: string;
    user_type_id: number;
    store_id: number;
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [AuthService]
})
export class AuthModule {
    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        if (parentModule) {
            throw new Error(
                'AuthModule is already loaded. Import it in the AppModule only');
        }
    }

}
