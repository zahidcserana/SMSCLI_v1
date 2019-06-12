import {domainName} from './../../globals/endPoint/config';
import {Component, OnInit} from '@angular/core';
import {PreAuthService} from '../pre-auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Helpers} from '../../helpers';
import {environment} from '../../../environments/environment';

interface Store {
    store_name: string;
    id: number;
}

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styleUrls: ['../auth.component.css']
})
export class ActivationComponent implements OnInit {

    private key: string;
    success: boolean;
    loader = true;
    message = '';
    isStore: string;
    store: Store;

    constructor(private auth: PreAuthService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        Helpers.setLoading(false);
        this.key = this.route.snapshot.queryParams.activation_key;
        const user = this.route.snapshot.queryParams.user;
        if(user) {
            this.isStore = user === 'company' ? null : user;
        } else {
            this.isStore = null;
        }
        this.checkActivation();
    }

    checkActivation() {
        this.auth.sendActivationCode(this.key, this.isStore).subscribe(
            res => {
                this.loader = false;
                if (res.status === 'OK') {
                    this.message = res.result.message;
                    if (this.isStore) {
                        this.store = res.result.data;
                    }
                    this.success = true;
                } else {
                    this.success = false;
                    this.message = res.result.error;
                }
            },
            err => {
                this.message = 'Something went wrong!!! Please try again.';
                this.loader = false;
                console.log(err);
                this.success = false;
            }
        );
    }

    goToLogin() {
        this.router.navigate(['/auth/login']);
    }

}
