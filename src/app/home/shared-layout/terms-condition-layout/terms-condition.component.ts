import {Component} from '@angular/core';
import {Page} from '../../home-modules/type.model';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../modules/http-with-injector/http.service';
import {MetaService} from '../../../_services/meta.service';
import {of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {isJson} from '../../../globals/_classes/functions';
import {ContentResoveService} from '../../home-service/contetn-resolve.service';
import {bannerImage} from '../../home-modules/layout.config';

@Component({
    selector: 'app-terms-condition',
    templateUrl: './terms-condition.component.html',
    styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent {

    page: Page;
    loader: boolean;
    contents: any;
    bannerImage: any;
    constructor(private activeRoute: ActivatedRoute,
                private http: HttpService,
                private metaS: MetaService,
                private contentService: ContentResoveService) {
        this.page = new Page();
        this.getPageData();
    }

    ngOnInit() {
        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
    }

    getPageData() {
        this.loader = true;
        this.http.get('pages/terms-and-conditions').subscribe(
            res => {
                this.loader = false;
                if (res.status === 'OK') {
                    this.page = res.result.data;
                    const data = isJson(res.result.data.contents) ? JSON.parse(res.result.data.contents) : {
                        content: 'Please Add Your Content',
                        heading: 'page'
                    };
                    this.page.contents = data.content;
                    this.page.heading = data.heading;
                    this.addTages();
                }
            },
            err => {
                this.loader = false;
                this.page = new Page();
            }
        );
    }

    addTages() {
        this.metaS.setTitle(this.page.name);
        const metaTag = [
            {name: 'description', content: this.page.meta_description},
            {property: 'keyword', content: this.page.meta_keyword}
        ];
        this.metaS.updateTags(metaTag);
    }

    getBannerImage() {
        if (this.contents.pagesBanner) {
            this.bannerImage = bannerImage(this.contents.pagesBanner);
        }
    }
}
