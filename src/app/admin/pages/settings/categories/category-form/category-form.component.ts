import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Category } from '../../models/category.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { GET_STORE_ID } from '../../../../../globals/_classes/functions';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnChanges {

  loader: boolean;
  formatedUrl: string;

  @Input('edit') edit: boolean;
  @Input('category') category: Category;
  @Input('hiddenCate') hiddenCate: boolean;
  @Input('selectedId') selectedId: number;
  @Output('alert') alert: EventEmitter<any> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private cateS: CategoryService
  ) { }

  ngOnChanges() {
    this.formatedUrl = this.category.url ? '/category/'+ this.category.uuid + '/' + this.category.url : '';
  }

  makeCategoryURL() {
    if (this.category.name) {
      let arr = this.category.name.split(' ');
      this.category.url = arr.join('-').toLowerCase();
    }
  }

  addCategory(f) {
    this.loader = true;
    this.category.store_id = GET_STORE_ID();
    // console.log(this.category);
    this.cateS.addCatagory(this.category)
      .then(
        res => {
          this.loader = false;
          // console.log(res);
          this.alert.emit({ error: false, message: 'Category has been successfully added' });
          // this.resetCategory();
        }
      ).catch(
        err => this.error(err, 'Something worng! Category has been not added')
      );
  }

  updateCategory() {
    this.loader = true;
    // console.log(this.category);
    this.cateS.updateCatagory(this.selectedId, this.category)
      .then(
        res => {
          // console.log(res);
          this.loader = false;
          this.alert.emit({ error: false, message: 'Category has been successfully updated' });
        }
      ).catch(
        err => this.error(err, 'Something worng! Category has been not updated')
      );

  }


  deleteCategory() {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
      .then((result) => {
        if (result) {
          this.loader = true;
          // console.log(result);
          this.deleteAction();
        }
      });

  }

  deleteAction() {
    this.cateS.deleteCategory(this.selectedId)
      .then(
        res => {
          // console.log(res);
          this.loader = false;
          this.alert.emit({ error: false, message: 'Category has been successfully deleted' });
        })
      .catch(
        err => this.error(err, 'Something worng! Category has been not deleted')
      );
  }

  resetCategory() {
    this.hiddenCate = false;
    this.category = new Category();
  }

  error(err, message) {
    console.log(err);
    this.loader = false;
    this.alert.emit({ error: true, message: message });
  }

  copyUrl(copyText) {
    copyText.select();
    document.execCommand('copy');
  }

}


