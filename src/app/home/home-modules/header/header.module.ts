import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { HomeCartlistComponent } from './home-cartlist/home-cartlist.component';
import { NavtoggleDirective } from './navtoggle.directive';
import { SearchItemComponent } from './search-item/search-item.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  declarations: [
    NavtoggleDirective,
    HeaderComponent,
    HomeCartlistComponent, SearchItemComponent],

  exports: [HeaderComponent]
})
export class HeaderModule { }
