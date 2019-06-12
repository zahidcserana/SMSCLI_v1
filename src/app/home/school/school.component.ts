import { Component, OnInit } from '@angular/core';
import {ScriptLoaderService} from "../../_services/script-loader.service";
import {Helpers} from "../../helpers";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

    constructor( private _script: ScriptLoaderService) {
    }

    ngOnInit() {
        this.getSettings();
    }

    getSettings() {
        Helpers.loadStyles('head', 'assets/school/css/linearicons.css');
        Helpers.loadStyles('head', 'assets/school/css/font-awesome.min.css');
        Helpers.loadStyles('head', 'assets/school/css/bootstrap.css');
        Helpers.loadStyles('head', 'assets/school/css/magnific-popup.css');
        Helpers.loadStyles('head', 'assets/school/css/nice-select.css');
        Helpers.loadStyles('head', 'assets/school/css/animate.min.css');
        Helpers.loadStyles('head', 'assets/school/css/owl.carousel.css');
        Helpers.loadStyles('head', 'assets/school/css/jquery-ui.css');
        Helpers.loadStyles('head', 'assets/school/css/main.css');
        this._script.loadScripts('body', [
            'assets/school/js/vendor/jquery-2.2.4.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
            'assets/school/js/vendor/bootstrap.min.js',
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyBhOdIF3Y9382fqJYt5I_sswSrEw5eihAA',
            'assets/school/js/easing.min.js',
            'assets/school/js/hoverIntent.js',
            'assets/school/js/superfish.min.js',
            'assets/school/js/jquery.ajaxchimp.min.js',
            'assets/school/js/jquery.magnific-popup.min.js',
            'assets/school/js/jquery.tabs.min.js',
            'assets/school/js/jquery.nice-select.min.js',
            'assets/school/js/owl.carousel.min.js',
            'assets/school/js/mail-script.js',
            'assets/school/js/main.js',
        ])
            .then(result => {
                Helpers.setLoading(false);
            });
    }
}
