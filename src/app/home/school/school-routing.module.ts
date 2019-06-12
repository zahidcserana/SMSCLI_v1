import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SchoolComponent} from "./school.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
    {
        path: '',
        component: SchoolComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
        ]

    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchoolRoutingModule {
}
