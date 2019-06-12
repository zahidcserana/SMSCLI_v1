
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
import {Helpers} from "../../helpers";
import { GET_USER } from '../../globals/_classes/functions';
import { logOutStore } from "../../globals/endPoint/config";


@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

	param;

	constructor(private _router: Router) {
		this.param = GET_USER().store_name && GET_USER().store_id;
	}

	ngOnInit(): void {
		Helpers.setLoading(true);
		this.logout();
		if(this.param) {
			window.open(logOutStore + '/auth/login', "_self");
		} else {
			this._router.navigate(['/auth/partner-login']);
		}
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		sessionStorage.removeItem('currentUser');
		Helpers.setLoading(false);
		
	}
		

}