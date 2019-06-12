import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../modules/http-with-injector/http.service';
import {MetaService} from '../../../_services/meta.service';
import {map, switchMap, tap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Page} from '../../home-modules/type.model';
import {isJson} from '../../../globals/_classes/functions';
import {ContentResoveService} from '../../home-service/contetn-resolve.service';
import {bannerImage} from '../../home-modules/layout.config';


@Component({
    selector: 'about',
    templateUrl: './about-layout.component.html',
    styleUrls: ['./about-layout.component.css']
})
export class AboutLayoutComponent {

    page: Page = new Page();
    loader: boolean;
    contents: any;
    bannerImage: any;

    constructor(private activeRoute: ActivatedRoute,
                private http: HttpService,
                private metaS: MetaService,
                private contentService: ContentResoveService) {
        this.getPageData();
    }

    ngOnInit() {
        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
    }

    getPageData() {
        this.loader = true;
        this.http.get('pages/about').subscribe(
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
