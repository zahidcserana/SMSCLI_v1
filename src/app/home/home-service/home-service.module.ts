import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HomeService } from './home.service';
import { HomeResoveService } from './home-resolve.service';


@NgModule({
    providers: [HomeService, HomeResoveService],
})
export class HomeServiceModule {
    constructor(@SkipSelf() @Optional() parentModule: HomeServiceModule) {
        if (parentModule) {
            throw Error('Module is already loaded');
        }
    }

    static forRoot(@Optional() config?: HomeServiceConfig): ModuleWithProviders {
        return {
            ngModule: HomeServiceModule,
            providers: [{ provide: HomeServiceConfig, useValue: config }]
        };
    }
}

export class HomeServiceConfig {
    config: any = '';
}
