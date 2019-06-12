import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../../type.model';
import { ContentResoveService } from '../../../home-service/contetn-resolve.service';

@Component({
    selector: 'app-banner2',
    templateUrl: './banner2.component.html',
    styleUrls: ['./banner2.component.css']
})
export class Banner2Component implements OnInit {
    @Input() data: Banner[];

    bannerImage: any;
    constructor(private service: ContentResoveService) {
    }

    ngOnInit() {
        const bg = this.service.contents && this.service.contents.bannerBackground ? 
        (Array.isArray(this.service.contents.bannerBackground) && this.service.contents.bannerBackground.length > 0 ? this.service.contents.bannerBackground[0] : this.service.contents.bannerBackground) : '';
        this.getBannerImage(bg);
    }

    get bground() {
        return [
            {
                label: '',
                link: null,
                text: '',
                url: 'https://www.logistec.com/wp-content/uploads/2017/12/placeholder.png',
            }
        ];
    }



    getBannerImage(bg) {
        if (bg) {
            this.bannerImage = {
                'background-image': `url(${bg.url})`,
                'background-repeat': 'no-repeat',
                'background-position': 'right center',
                'background-size': '100%'
            };
        }
    }

}
