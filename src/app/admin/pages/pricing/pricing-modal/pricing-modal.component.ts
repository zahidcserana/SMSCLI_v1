import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { PlanList, FeatureList, SubscriptionPlan } from '../models/pricing-models';
import { AlertService } from '../../../../modules/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { PricingService } from '../pricing.service';
import { Helpers } from '../../../../helpers';
@Component({
    selector: 'pricing-modal',
    templateUrl: './pricing-modal.component.html',
    styleUrls: ['./pricing-modal.component.css']
})
export class PricingModalComponent implements OnInit {
    isMonthly: boolean;
    isNew: boolean;
    current_plan;
    plans = PlanList;
    featurelist = FeatureList;
    Loader: boolean;
    subsPlans: SubscriptionPlan[] = [];
    @ViewChild('hasCusAlert') alertContainer: ElementRef;
    constructor(
        private service: PricingService,
        private route: ActivatedRoute,
        private alert: AlertService, ) {
        this.subsPlans = this.route.snapshot.data.subs_plans;
        this.plans.map(item => {
            item['plan_id'] = this.service.getPlanId(item.name, this.subsPlans);
        });
    }

    ngOnInit() {
        this.getSettings();
    }

    showAlert(e) {
        if (e.res) {
            this.alert.success(this.alertContainer, e.message, false, 5000);
        } else {
            this.alert.error(this.alertContainer, e.message, false, 5000);
        }
    }
    onLoad(e) {
        if (e) {
            Helpers.setLoading(true);
        } else {

            Helpers.setLoading(false);
        }
    }
    getCurrent_plan() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.current_plan = user.subscription && user.subscription.account_type ? String(user.subscription.account_type).toUpperCase() : 'FREE';
    }

    getBtnName(price) {
        let name = '';
        const plan = this.plans.find(item => item.name === this.current_plan);
        const plan_price = Number(plan.price_monthly);
        if (Number(price) > plan_price) {
            name = 'UPGRADE';
        } else {
            name = 'DOWNGRADE';
        }
        return name;
    }

    changeSubsPeriod(type) {
        this.isMonthly = type === 'monthly' ? true : false;
    }

    getSubsCription() {
        const subscription = {
            account_type: this.current_plan,
            card: null,
            isMonthly: this.isMonthly
        };
        return subscription;
    }

    onUpgrade(e) {
        if (e) {
            this.getSettings();
        }

    }
    getSettings() {
        this.getCurrent_plan();
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user.subscription && user.subscription.isMonthly && user.subscription.isNew) {
            this.isMonthly = user.subscription.isMonthly;
            this.isNew = user.subscription.card ? false : true;
        } else {
            this.isMonthly = true;
            this.isNew = true;
        }

        this.plans = PlanList;
    }
}
