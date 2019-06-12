import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Content} from '../../models/contents.model';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ContentService} from '../../setting-service/contents.service';
import {AlertService} from '../../../../../modules/alert/alert.service';
import { isJson } from '../../../../../globals/_classes/functions';


@Component({
    selector: 'app-site-specific',
    templateUrl: './site-specific.component.html',
    styleUrls: ['./site-specific.component.css']
})
export class SiteSpecificComponent implements OnInit {

    config: Content;
    textForm: FormGroup;
    loader: boolean;
    edit: boolean;
    contentId: number;
    links = [];
    formArray = [];


    @ViewChild('hasCusAlert') alertContainer: ElementRef;

    constructor(private service: ContentService,
                private alert: AlertService,
                private fb: FormBuilder) {
        this.getContentList();
        this.config = new Content();
    }

    ngOnInit() {
        this.config.tag = 'site_specific';
        this.config.type = 'site-links';
        this.config.status = 1;
    }


    private getContentList() {
        this.service.getContents('site-links').subscribe(
            res => {
                this.links = res;
                this.findLinks();
            }
        );
    }

    private findLinks() {
        if (this.links.length > 0) {
            this.contentId = this.links[0].id;
            const data = this.links[0].contents;
            this.formArray = this.service.fornmatSiteSecific(data);
            this.textForm = this.fb.group(this.createForm(this.formArray));
            this.edit = true;
        } else {
            this.edit = false;
        }
    }

    private createForm(data) {
        const obj = {};
        for (const f of data) {
            const iner = {};
            for (const i of f.contorls) {
                iner[i.name] = i.value;
            }
            obj[f.group] = this.fb.group(iner);
        }
        return obj;
    }

    save() {
        this.loader = true;
        const data = {
            config: this.config,
            contents: JSON.stringify(this.textForm.value)
        };
        this.service.addUpdate(data, this.contentId, this.edit).then(
            res => {
                this.loader = res.loader;
                this.allertShow(res.alert);
            }
        );

    }

    allertShow(e) {
        this.getContentList();
        if (e.message) {
            if (e.status) {
                this.alert.success(this.alertContainer, e.message, true, 5000);
            } else {
                this.alert.error(this.alertContainer, e.message, true, 5000);
            }
        }
    }

}
