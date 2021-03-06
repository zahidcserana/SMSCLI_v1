import {NgModule} from '@angular/core';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import {CommonModule} from '@angular/common';
import { PagesComponent } from '../pages/pages.component';
import { RouterModule } from '@angular/router';
import { HrefDirectiveModule } from '../../_directives/directive.module';



@NgModule({
	declarations: [
		HeaderNavComponent,
		AsideNavComponent,
		PagesComponent,
		FooterComponent
	],
	exports: [
		HeaderNavComponent,
		AsideNavComponent,
		PagesComponent,
		FooterComponent,
		HrefDirectiveModule
	],
	imports: [
		CommonModule,
		RouterModule,
		HrefDirectiveModule
	]
})
export class CompanyLayoutModule {
}