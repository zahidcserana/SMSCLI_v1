import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ScriptLoaderService } from '../../_services/script-loader.service';
import { isJson } from '../../globals/_classes/functions';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Layout1Component implements OnInit {

  constructor(
    private _script: ScriptLoaderService
  ) {
    this._script.loadScripts('body', ['assets/js/home/layout1.js']);
  }

  ngOnInit() {
    this.checkCartTime();
  }

  private checkCartTime() {
    const cart = isJson(localStorage.getItem('user_cart')) ? JSON.parse(localStorage.getItem('user_cart')) : null;
    const list = ['user_cart', 'token'];
    if(cart && cart.created) {
        const cr = new Date(cart.created).getTime() + (60 * 60 *24 * 1000 * 6);
        const now = new Date().getTime();
        if( cr < now ) {
            list.forEach( f => localStorage.removeItem(f));
        }
    } else {
        list.forEach( f => localStorage.removeItem(f));
    }
  }

  
}
