import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
import {Helpers} from "./helpers";
import { GET_USER } from './globals/_classes/functions';

@Component({
	selector: 'body',
	templateUrl: './app.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
	
	constructor(private _router: Router) {
	}

	ngOnInit() {
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				Helpers.setLoading(true);
			}
			if (route instanceof NavigationEnd) {
				Helpers.setLoading(false);
			}
			window.scrollTo(0, 0);
		});
	}

}