import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {AccountsComponent} from "./accounts.component";
import {AddFormComponent} from "./add-form/add-form.component";
import {PaginationModule} from "../../../../modules/pagination/pagination.module";
import {DialogBoxModule} from "../../../../modules/dialog-box/dialog-box.module";
import {DialogBoxComponent} from "../../../../modules/dialog-box/dialog-box.component";
import { FilterComponent } from './filter/filter.component';

const route: Routes = [
    {path: '', component: AccountsComponent}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(route),
        PaginationModule,
        DialogBoxModule
    ],
    entryComponents: [AddFormComponent, DialogBoxComponent],
    declarations: [AccountsComponent, AddFormComponent, FilterComponent]
})
export class AccountsModule {
}
