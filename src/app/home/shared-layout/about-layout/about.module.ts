import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutLayoutComponent } from './about-layout.component';
import { InnerHtmlComponentModule } from '../../../modules/inner-html-component/inner-html-component.module';

const routes: Routes = [
    {
        path: '',
        component: AboutLayoutComponent,
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        InnerHtmlComponentModule
    ],
    exports: [],
    declarations: [AboutLayoutComponent]
})
export class AboutModule {
}
