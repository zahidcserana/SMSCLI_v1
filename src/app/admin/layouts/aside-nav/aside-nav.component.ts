import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Helpers } from '../../../helpers';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { map } from 'rxjs/operators';
import { FormateStatus, GET_USER } from '../../../globals/_classes/functions';
import { SidebarService } from '../../pages/sidebar-service/sidebar.service';
import { AlertService } from '../../../modules/alert/alert.service';

declare let mLayout: any;
@Component({
selector: "app-aside-nav",
templateUrl: "./aside-nav.component.html",
encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    status: string[] = [];

    @ViewChild('hasCusAlert') alertContainer: ElementRef;

constructor(
    private sidebarS: SidebarService,
    private alertS: AlertService,
    private http: HttpService
)  {
    // http.get('order/status').pipe(map( res=> res.result.data)).subscribe(
    //     res => {
    //         this.status = Object.values(res);
    //         // console.log(this.status);
    //     },
    //     err => console.log(err)
    // );
}
ngOnInit()  {

}
ngAfterViewInit() {
    mLayout.initAside();
    // $('.m-menu__subnav m-menu__item m-menu__link').click((e) => {
    //     $('.m-menu__subnav m-menu__item').removeClass('m-menu__item--active');
    //     $(e.target).addClass('m-menu__item--active');
    // });
}

// formatStatus(s) {
//     return FormateStatus(s)
// }

openSidebar() {
    const store = GET_USER().location_id;
	if(store) {
		this.sidebarS.sidebarOpenChange(true);
        this.sidebarS.openCartSidebar();
	} else {
        this.alertS.info(this.alertContainer, "Store has not been selected. Please select store.", true, 5000);
    }
}

get is_manager() {
    return GET_USER().user_type_id == 4;
}

}