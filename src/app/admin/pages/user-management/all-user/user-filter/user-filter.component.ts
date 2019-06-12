import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserSearch } from '../../models/user.models';
import { UserService } from '../../user.service/user.service';

declare let $:any;

@Component({
  selector: 'user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['../all-user.component.css']
})
export class UserFilterComponent implements AfterViewInit {

  userSearch:UserSearch = new UserSearch();
  filter:string = '';
  reset: boolean;

  @Output('loadList') loadList:EventEmitter<string> = new EventEmitter();

  constructor(
    private userS:UserService
  ) { }

  ngAfterViewInit() {
    this.datePicker();
  }

  searchUsers(){
    this.filter = this.userS.proccessFilterParam(this.userSearch);
    if(this.filter) {
      this.loadList.emit(this.filter);
      this.reset = true;
    }
  }

  resetSearch(){
    this.userSearch = new UserSearch();
    this.userSearch.created = null;
    this.filter = null;
    if(this.reset) {
      this.loadList.emit('');
      this.reset = false;
    }
  }

  dateChange(){
    $('#created-date').datepicker().on('changeDate',(e)=>{
      let date = e.date;
      this.userSearch.created = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      // console.log(this.userSearch.created);
    })
  }

  private datePicker(){
    $('#created-date').datepicker({
      todayHighlight: true,
      orientation: "bottom left",
      format: 'yyyy-mm-dd',
      templates: {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>'
      }
    });
  }

}
