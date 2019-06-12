import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { Helpers } from '../helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  showStore = false;
  
  constructor(
    private _script: ScriptLoaderService,
    private activeroute: ActivatedRoute
  ) {
    activeroute.data.subscribe(
      val => {
        if (val.settings) {
          const store = JSON.parse(sessionStorage.getItem('online_store'));
          if (store.location && store.location.id && store.store.token) {
            this.getSettings();
            this.showStore = true;
          } else {
            this.error();
          }
        } else {
          this.error();
        }
      }
    );
  }

  ngOnInit() {
  }

  getSettings() {
    Helpers.loadStyles('head', 'assets/css/home/bootstrap.min.css');
    Helpers.loadStyles('head', 'assets/css/home/global.css');
    this._script.loadScripts('body', [
        'assets/js/home/bootstrap.js'
      ])
      .then(result => {
        Helpers.setLoading(false);
    });
  }

  error() {
    this.showStore = false;
    Helpers.setLoading(false);
  }

}
