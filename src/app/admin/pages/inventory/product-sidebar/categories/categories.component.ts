import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryService } from './category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryList } from '../product_models';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { Helpers } from '../../../../../helpers';

declare let $: any;


@Component({
  selector: 'product-sidebar-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {

  treeView: any = null;
  categoryList: CategoryList[] = [];
  pro_id: number;
  selectedCategory: CategoryList;
  loader: boolean;
  addTrue: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
      private modalService: NgbModal,
      private cateS: ProductCategoryService,
      private router: Router,
      private alertS: AlertService,
      private inventoryS: InventoryService,
      private activeRoute: ActivatedRoute
    ) {
        this.pro_id = this.inventoryS.getProId(this.activeRoute);
        const catData = this.activeRoute.snapshot.data['list'].data;
        if(catData) {
          console.log(catData);
          this.categoryList = catData.map(e => {
            e.category_chain = e.category_chain.replace(/##/g, ' > ').replace(/#/g, '');
            return e;
          });
        }
     }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0, 0);
    this.cateS.treeView();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.onCheckedTree();
  }

  ngOnDestroy() {
    const url: string = this.activeRoute.snapshot['_routerState'].url;
    if (url.includes('details/edit')) {
      this.inventoryS.reload({reload: true, id: this.pro_id, from: 'CATEGORY', data: this.categoryList});
    }
  }

  private onCheckedTree() {
    const tree = $('#category-jsTree');
    tree.on('changed.jstree', (e, data) => {
      const path = data.selected.map(id => {
        return tree.jstree('get_path', id, '>');
      });
      this.selectedCategory = this.cateS.formatCategory(data.selected, path);
      this.addTrue = this.cateS.disableSave(this.selectedCategory.category_id);
    });
  }


  gotoAddCategory() {
    this.router.navigate(['admin/settings/manage-categories']);
  }

  saveSelectedCategory() {
    this.loader = true;
    this.cateS.saveCategory(this.pro_id, this.selectedCategory).then(
      res => {
        this.loader = false;
        this.addTrue = false;
        if(res.status == 'OK' && res.result.data) {
          let cat = new CategoryList();
          cat = res.result.data;
          cat.category_chain = cat.category_chain.replace(/##/g, ' > ').replace(/#/g, ''); 
          this.categoryList.push(cat);
          this.alertS.success(this.alertContainer, 'Category has been added', true, 5000);
        } else {
          this.error('', 'Something worng! Category has been added before or other problem');
        }
      }
    ). catch(
      err => this.error(err, 'Something worng! Category has been added before or other problem')
    );
  }

  listTrackby(index, list) {
    return list ? list.id : undefined;
  }

  deleteTreeItem(cate, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result) => {
      if (result) {
        Helpers.setLoading(true);
        this.deleteCategory(cate.id, i);
      }
    });
  }

  deleteCategory(cate_id, index) {
    this.cateS.deleteCategory(cate_id)
    .then(
      res => {
          this.alertS.success(this.alertContainer, 'Category has been deleted', true, 5000);
          this.categoryList.splice(index, 1);
          Helpers.setLoading(false);
      })
    .catch(
      err => {
        this.error(err, 'Something worng! Category list has not been deleted');
        Helpers.setLoading(false);
      }
    );
  }

  error(err, message) {
    this.loader = false;
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }



}
