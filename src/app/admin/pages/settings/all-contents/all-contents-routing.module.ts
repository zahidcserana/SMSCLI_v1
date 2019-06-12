import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllContentsComponent } from './all-contents.component';
import { SettingResolveService } from '../setting-service/setting-resolve.service';


const routes: Routes = [
    {
        path: '',
        component: AllContentsComponent,
        children: [
            {
                path: 'store-logo',
                loadChildren: './store-logo/store-logo.module#StoreLogoModule'
            },
            {
                path: 'time-zone',
                loadChildren: './time-zone/time-zone.module#TimeZoneModule',
                resolve: { 'list': SettingResolveService }
            },
            {
                path: 'layout',
                loadChildren: './layout/layout.module#LayoutConentModule',
                resolve: { 'layout': SettingResolveService }
            },
            {
                path: 'banner',
                loadChildren: './banner/banner.module#BannerModule',
                resolve: {'content': SettingResolveService}
            },
            {
                path: 'grid',
                loadChildren: './grid/grid.module#GridModule'
            },
            {
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            },
            {
                path: 'site-specific',
                loadChildren: './site-specific/site-specific.module#SiteSpecificModule',
            },
            {
                path: 'custom-content',
                loadChildren: './custom-contents/contents.module#ContentsModule'
            },
            {
                path: '**',
                redirectTo: 'store-logo',
                pathMatch: 'full',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllContentsRoutingModule { }
