import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../layouts/layout.module';
import { PagesComponent } from '../pages.component';
import { FormsModule } from '@angular/forms';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubsPaymentComponent } from './subs-payment/subs-payment.component';
import { PricingModalComponent } from './pricing-modal/pricing-modal.component';
import { PricingService } from './pricing.service';
import { PreloaderModule } from '../../../modules/preloader/preloader.module';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { BillingInvoicesComponent } from './billing-invoices/billing-invoices.component';


const route: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: PricingComponent,
                resolve: { subs_plans: PricingService }
            },
            {
                path: 'paymentmethod',
                component: SubsPaymentComponent,
                resolve: { cards: PricingService }
            },
            {
                path: 'billing-history',
                component: BillingInfoComponent,
                resolve: { payment_history: PricingService }
            },
            {
                path: 'billing-invoice/:id',
                component: BillingInvoicesComponent,
                resolve: { invoice_details: PricingService }
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        LayoutModule,
        FormsModule,
        SubscriptionModule,
        PreloaderModule
    ],
    declarations: [PricingComponent, SubsPaymentComponent, PricingModalComponent, BillingInfoComponent, BillingInvoicesComponent],
    providers: [PricingService]
})
export class PricingModule {
}
