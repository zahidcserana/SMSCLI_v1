import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.models';
import { DragulaService } from 'ng2-dragula';
import { CategoryService } from '../category.service';


@Component({
  selector: 'category-sorting',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  categoryList: Category[];
  categoryChildIds: number[] = [];
  loader: boolean;
  dataLoader: boolean;

  @Input('id') id: any;
  @Input('category') category: Category;
  @Output('alert') alert: EventEmitter <any> = new EventEmitter();

  constructor(
    private dragulaS: DragulaService,
    private cateS: CategoryService
  ) {
    this.cateS.category_id.subscribe(
      id => {
        this.id = id;
        if (id ) {
          this.getCategoryById();
        }
      }
    );
  }

  ngOnInit() {
    this.dragulaS.drop.subscribe(
      value => {
        const before = parseInt(value[1].dataset.id);
        const after = value[4] ? parseInt(value[4].dataset.id) : null;
        console.log(before, after);
        this.categoryChildIds = this.cateS.sortingChildCategory(before, after, this.categoryChildIds);
        // console.log(this.categoryChildIds);
      }
    );
  }

  updateOrder() {
    this.loader = true;
    const data = {categories: this.categoryChildIds};
    this.cateS.updateSorting(this.id, data).then(
      res => {
        // console.log(res);
        this.loader = false;
        this.alert.emit({error: false, message: 'Category sorting has been updated'});
      }
    ). catch (
      err => {
        console.log(err);
        this.loader = false;
        this.alert.emit({error: true, message: 'Something worng! Category sorting has been not updated'});
      }
    );
  }

  getCategoryById() {
    this.dataLoader = true;
    this.cateS.getCategoryById(this.id).subscribe(
      res => {
        // console.log(res);
        this.dataLoader = false;
        this.categoryList = res;
        this.categoryChildIds = this.categoryList.map((c) => {
          return c['id'];
        });
        // console.log(this.categoryChildIds);
      },
      err => {
        console.log(err);
        this.alert.emit({error: true, message: 'Something worng!!!!'});
      }
    );
  }





}
