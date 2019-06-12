import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap, catchError} from 'rxjs/operators';
import {HttpService} from '../../../modules/http-with-injector/http.service';
import {of} from 'rxjs';
import {MetaService} from '../../../_services/meta.service';
import {isJson} from '../../../globals/_classes/functions';
import {Page} from '../../home-modules/type.model';
import {ContentResoveService} from '../../home-service/contetn-resolve.service';
import {bannerImage} from '../../home-modules/layout.config';

@Component({
    selector: 'app-custom-page',
    templateUrl: './custom-page.component.html',
    styleUrls: ['./custom-page.component.css']
})
export class CustomPageComponent implements OnInit {

    page: Page;
    loader: boolean;
    contents: any;
    bannerImage: any;

    constructor(private activeRoute: ActivatedRoute,
                private http: HttpService,
                private metaS: MetaService,
                private contentService: ContentResoveService) {
        this.page = new Page();
    }

    ngOnInit() {
        this.loader = true;
        this.activeRoute.paramMap.pipe(
            map(m => m.get('slug')),
            switchMap(slug => {
                return this.http.get('pages/' + slug);
            })
        ).subscribe(
            res => {
                this.loader = false;
                if (res.status === 'OK') {
                    this.page = res.result.data;
                    const data = isJson(res.result.data.contents) ? JSON.parse(res.result.data.contents) : {
                        content: 'Please Add Your Content',
                        heading: 'Page'
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
        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
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
