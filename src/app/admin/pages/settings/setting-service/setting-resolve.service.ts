import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { SettingService } from './setting.service';
import { ContentService } from './contents.service';
import { HoursHolidaysService } from './hours-holidays.service';




@Injectable()
export class SettingResolveService implements Resolve<any> {

    constructor(private service: SettingService, private content: ContentService, private hoursHolidays: HoursHolidaysService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        switch (router.routeConfig.path) {
            case 'variant':
                return this.service.getAttributeSets(1,20);
            case 'tag':
                return this.service.getTags();
            case 'coupon':
                return this.service.getCoupons(1,20);
            case 'supplier':
                return this.service.getSupplier(1, 20);
            case 'section':
                return this.service.getSection(1, 20);
            case 'layout':
                return this.content.getLayout();
            case 'banner':
                return this.content.getContentConfig('banner');
            case 'time-zone':
                return this.content.getTimezoneList();
            case 'hours-holidays':
                return this.hoursHolidays.getWeekDays();
            case 'delivery':
                return this.service.getDeliveryCondition();
        }   
    }

}