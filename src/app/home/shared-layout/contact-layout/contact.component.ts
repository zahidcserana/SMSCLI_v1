import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../../../modules/http-with-injector/http.service';
import {AlertService} from '../../../modules/alert/alert.service';
import {ContentResoveService} from '../../home-service/contetn-resolve.service';
import {bannerImage} from '../../home-modules/layout.config';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    loader: boolean;
    form: FormGroup;
    tempPhoneNum: number;
    contents: any;
    bannerImage: any;
    @ViewChild('hasAlert') alertContainer: ElementRef;

    constructor(private fb: FormBuilder,
                private http: HttpService,
                private alert: AlertService,
                private contentService: ContentResoveService) {
        this.form = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            phone: ['', Validators.required],
            tempPhone: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.contents = this.contentService.contents ? this.contentService.contents : [];
        this.getBannerImage();
    }

    submit() {
        console.log(this.form.getRawValue());
        this.loader = true;
        this.http.post('contactus', this.form.getRawValue()).toPromise()
            .then(res => {
                this.loader = false;
                if (res.status === 'OK') {
                    $('custom-alert').css('display', 'block');
                    this.alert.success(this.alertContainer, 'Message sent successfully. Thank you.', true, 3000);
                    this.form.reset();
                }
            }).catch(err => {
            this.loader = false;
            $('custom-alert').css('display', 'block');
            this.alert.error(this.alertContainer, 'Somethig wrong  !! Please try again  ', true, 3000);
        });

    }

    valuechange(e) {
        this.tempPhoneNum = e;
        const re = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;
        const format = '($1) $2-$3';
        this.form.get('tempPhone').setValue(e.replace(re, format));
        this.form.get('phone').setValue(e.replace(re, format));
    }
    getBannerImage() {
        if (this.contents.pagesBanner) {
            this.bannerImage = bannerImage(this.contents.pagesBanner);
        }
    }
}
