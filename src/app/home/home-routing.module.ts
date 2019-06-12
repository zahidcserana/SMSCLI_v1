import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';



const route: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: './school/school.module#SchoolModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}
