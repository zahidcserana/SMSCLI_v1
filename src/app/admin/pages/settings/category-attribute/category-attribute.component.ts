import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesAttributeService } from './categories-attribute.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { HttpInspectorService } from '../../../../modules/http-with-injector/http-inspector.service';
import { DialogBoxComponent } from '../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../helpers';

export class CateAttr {
  categories: number[];
  attribute_set_id: any;
}

declare let $:any;

@Component({
  selector: 'app-category-attribute',
  templateUrl: './category-attribute.component.html',
  styleUrls: ['./category-attribute.component.css']
})
export class CategoryAttributeComponent implements OnInit, AfterViewInit {

  loader: boolean;
  CategoriesAttributes = [];
  sendData: CateAttr = new CateAttr();
  attributeSets = [];
  mainCate = [];
  selectedCate;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private modalService: NgbModal,
    private cateS: CategoriesAttributeService,
    private alertS: AlertService
  ) {
    this.getCategoryRoot();
    this.sendData.attribute_set_id = null;
    this.sendData.categories = [];
   }

  ngOnInit() {
    this.cateS.treeView();
    this.getAttributeSet();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.onCheckedTree();
  }

  trackAttribute(index, attr) {
    return attr ? attr.id : null;
  }

  callList(id) {
    // console.log(id);
    this.selectedCate = id;
    this.getCateAttrList(id);
  }

  getCategoryRoot() {
    this.cateS.getCategoryRoot().subscribe(
      res => {
        // console.log(res);
        this.mainCate = res;
        this.getCateAttrList(this.mainCate[0].id);
        this.selectedCate = this.mainCate[0].id;
      },
      err => console.log(err)
    );
  }

  getCateAttrList(id) {
    this.cateS.getCategoryAttributeList(id).subscribe(
      res => {
        // console.log(res);
        this.CategoriesAttributes = res.data;
        // console.log(this.CategoriesAttributes);
      },
      err => console.log(err)
    );
  }

  getAttributeSet() {
    this.cateS.getAttributeList().subscribe(
      res => {
        this.attributeSets = res.data;
      },
      err => console.log(err)
    );
  }

  private onCheckedTree() {
    const tree = $('#categoryAttr-jsTree');
    tree.on('changed.jstree', (e, data) => {
      this.sendData.categories = data.selected;
      // console.log(this.sendData.categories);
    });
  }

  addCateAttr() {
    this.sendData.attribute_set_id = parseInt(this.sendData.attribute_set_id);
    // console.log(this.sendData);
    this.cateS.saveCategoryAttr(this.sendData)
    .then(
      res => {
        // console.log(res);
        const newData = res.result.data;
        // console.log(newData);
        if(newData.length>0) {
          this.formateAdd(newData);
        }
        $('#categoryAttr-jsTree').jstree("deselect_all", true);
        this.sendData.categories = [];
        this.sendData.attribute_set_id = null;
        this.alertS.success(this.alertContainer, 'Categories attribute set has been added', true, 5000);
      }
    ).catch(
      err => this.error(err, 'Something wrong!! Categories attribute set has not been added')
    );
  }

  formateAdd(newData) {
    for(let n of newData) {
      let index = this.cateS.checkCate(n.id, this.CategoriesAttributes);
      if( index > -1) {
        let newArr = this.CategoriesAttributes[index].attribute_sets.concat(n.attribute_sets);
        this.CategoriesAttributes[index].attribute_sets = newArr;
      }
      // console.log(this.CategoriesAttributes[index]);
    }
  }

  deleteAttribute(Cid, Aid) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          Helpers.setLoading(true);
          const data = {category_id: Cid, attribute_set_id: Aid};
          this.archiveAttr(data);
        }
      }, (res) => {
        console.log(res);
      });
  }

  archiveAttr(data) {
    this.cateS.deleteCategoryAttr(data).then(
      res => {
        Helpers.setLoading(false);
        this.getCateAttrList(this.selectedCate);
        this.alertS.success(this.alertContainer, 'Categories attribute set has been deleted', true, 5000);
      }
    ).catch (
      err => this.error(err, 'Something wrong!! Categories attribute set has not been deleted')
    )
  }

  error(err, message) {
    this.loader = false;
    Helpers.setLoading(false);
    console.log(err);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

}
