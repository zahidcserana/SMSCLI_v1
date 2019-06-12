import {Component, OnInit} from '@angular/core';
import {Content} from '../../../home-modules/type.model';
import {ContentResoveService} from '../../../home-service/contetn-resolve.service';
import {MetaService} from '../../../../_services/meta.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    contents;
    layoutSection: any;

    constructor(public service: ContentResoveService, private metaS: MetaService) {
        this.contents = this.service.contents as Content;
        this.layoutSection = sessionStorage.getItem('online_store') ? JSON.parse(sessionStorage.getItem('online_store')).store.layout.section : null;
        this.addTages();
    }

    ngOnInit() {
        
    }

    addTages() {
        this.metaS.setTitle('Rent My – We Power The Sharing Economy');
        const metaTag = [
            {name: 'twitter:title', content: 'Rent My – We Power The Sharing Economy'},
            {property: 'og:title', content: 'Rent My – We Power The Sharing Economy'},
            {property: 'og:url', content: 'https://rentmy.co/'}
        ];
        this.metaS.updateTags(metaTag);
    }

    
}
