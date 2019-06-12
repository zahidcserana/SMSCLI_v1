import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Category } from '../models/category.models';
import { CategoryService } from './category.service';
import { AlertService } from '../../../../modules/alert/alert.service';



declare let $: any;


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  category: Category = new Category();
  hiddenCate: boolean = false;
  selectedId: string;
  edit: boolean = false;
  parent: Category = new Category();
  categoryList: Category[] = [];

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private cateS: CategoryService,
    private alertS: AlertService
  ) { }

  ngOnInit() {
    this.cateS.treeView();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.onChangeTree();
  }


  private onChangeTree() {
    $('#category-jsTree').on('changed.jstree', (e, data) => {
      // console.log(data);
      this.selectedId = data.selected[0];
      if (this.selectedId) {
        this.resetForm();
        this.openChildCat();
        this.cateS.changeId(this.selectedId);
      }
    });
  }

  openChildCat() {
    this.cateS.getCatagory(this.selectedId)
    .subscribe(
      res => {
        this.edit = true;
        this.parent = res.data;
        if (this.parent.parent_id) {
          this.hiddenCate = true;
        }
        if (this.edit) {
          this.category = this.parent;
          this.category.name = this.parent['text'];
        }
      },
      err => this.alert({error: true, message: 'Something worng!!!!'})
    );
  }

  initParentCat() {
    this.hiddenCate = false;
    this.edit = false;
    this.selectedId = null;
    this.category = new Category();
  }

  initChildCat() {
    if (this.selectedId) {
      this.hiddenCate = true;
      this.edit = false;
      this.category = new Category();
      this.category.parent_id = this.selectedId;
      this.category.parent_name = this.parent['text'];
    }
  }

  alert(data) {
    if (data.error) {
      this.alertS.error(this.alertContainer, data.message, true, 5000);
    } else {
      this.alertS.success(this.alertContainer, data.message, true, 5000);
      $('#category-jsTree').jstree(true).refresh();
      this.cateS.treeView();
    }
  }

  resetForm() {
    this.category = new Category();
    this.edit = false;
    this.hiddenCate = false;
  }

}
