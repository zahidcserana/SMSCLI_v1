import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {GET_USER} from '../../../../globals/_classes/functions';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

    hostname = environment.storeHoshName;
    storeUid = GET_USER().store_uid;

    links = {
        // plugin:  `<script src="https://${GET_USER().store_name}${this.hostname}/assets/js/rentmy_widget.js?store=${GET_USER().store_uid}"></script>`,
        pluginjs: `<script>var rentMyStoreConfig = {store :${this.storeUid}}</script>`,
        plugin: `<script src="https://clientapi.rentmy.co/frontend/js/widget.js"></script>`,
        feature: `<div id="rentmy-products" data-id="featured"></div>`,
        specific: `<div id="rentmy-products" data-products="comma seperated product ids"></div>`,
        limit: `<div id="rentmy-products" data-limit="6" data-products="comma seperated product ids"></div>`
    };

    constructor() {
    }

    ngOnInit() {
    }

}
