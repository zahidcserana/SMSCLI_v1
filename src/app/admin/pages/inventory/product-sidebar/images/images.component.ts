import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagePopupComponent } from '../../../../../modules/image-popup/image-popup.component';
import { ActivatedRoute } from '@angular/router';
import { Images, AttributManage } from '../product_models';
import { product_image, EndPoint } from '../../../../../globals/endPoint/config';
import { ImageService } from './image.service';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { Helpers } from '../../../../../helpers';
import { GET_STORE_ID } from '../../../../../globals/_classes/functions';


declare let $: any;

@Component({
  selector: 'product-sidebar-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements AfterViewInit, OnDestroy {

  pro_id: number;
  imageList: Images[] = [];
  url: string = product_image;
  upload_url: string = EndPoint;
  loader: boolean;
  listLoader: boolean;
  store_id = GET_STORE_ID();
  noData: boolean;
  selectedId = {
    variants_products_id : 0,
    product_id: 0
  };
  attributeList: AttributManage[] = [];
  applyAll: boolean;

  @ViewChild('hasCusAlert') alertContainer: ElementRef;


  constructor(
    private inventoryS: InventoryService,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal,
    private alertS: AlertService,
    private imageS: ImageService
  ) {
    this.pro_id = this.inventoryS.getProId(this.activeRoute);
    const attList = this.activeRoute.snapshot.data['list'].result.data;
    if(attList && attList.length > 0) {
      this.noData = null;
      this.getAttribute(attList);
    } else {
      this.noData = null;
    }
      this.getImageList();
  }

  ngAfterViewInit()  {
    $('.native-routing-container').scrollTop(0, 0);
    this.imageS.showButtons();
  }

  ngOnDestroy() {
    const url: string = this.activeRoute.snapshot['_routerState'].url;
    if (url.includes('details/edit')) {
      this.inventoryS.reload({reload: true, id: this.pro_id, from: 'SUMMARY'});
    }
  }

  get unassign() {
    return this.attributeList.map( m => m['set_id']).includes(1);
  }

  getAttribute(attList) {
    this.attributeList = attList.map((m) => {
      m['id'] = m.ids[m.ids.length - 1];
      m['chain'] = m.variant_set.map((a) => a.variant_set_name + '(' + a.name + ')').join(', ');
      m['set_id'] = m.variant_set.length > 0 ? m.variant_set[0].variant_set_id : null;
      return m;
    });
 
    if(this.attributeList.length > 0) {
      let attr =  this.attributeList.find( f => {
        return f.default;
      });
      this.selectedId.variants_products_id  = attr ? attr.id : this.attributeList[0].id;
      this.selectedId.product_id = this.pro_id;
    }
  
    this.listLoader = true;
    this.getImageList();
    this.imageS.showButtons();
  }

  applyToAll() {
    if(this.applyAll) {
      this.selectedId['all'] = this.attributeList.filter( f => f.id != this.selectedId.variants_products_id)
      .map( m => m.id);
    } else {
      delete this.selectedId['all'];
    }
    console.log(this.applyAll, this.selectedId);
  }

  attributeChange() {
    this.applyAll = false;
    this.listLoader = true;
    this.selectedId.product_id = this.pro_id;
  }

  getImageList() {
    this.inventoryS.getImageList(this.pro_id, this.selectedId.variants_products_id )
    .subscribe(
      res => {
        this.imageList = res.data;
        setTimeout(() => this.imageS.showButtons(), 500);
        this.listLoader = false;
      },
      err => {console.log(err); this.listLoader = false;}
    );
  }

  uploadImages() {
    this.alertS.success(this.alertContainer, 'Image(s) have been successfully uploaded', true, 5000);
    this.getImageList();
  }


  removeImage( img, i) {
    const modalRef = this.modalService.open(DialogBoxComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result) => {
      if (result) {
        Helpers.setLoading(true);
        this.deleteImage(img, i);
      }
    });
  }

  deleteImage(img, i) {
    this.inventoryS.deleteProductImage(img.id)
    .then(
      res => {
        this.alertS.success(this.alertContainer, 'Image has been deleted', true, 5000);
        this.imageList.splice(i, 1);
        this.getImageList();
        Helpers.setLoading(false);
      }
    ). catch (
      err => this.error(err, 'Someting worng! Image has been not deleted')
    );
  }

  showBigImage(img) {
    const modalImage = this.modalService.open(ImagePopupComponent, {
      centered: true
    });
    modalImage.componentInstance.image = this.url + `/${this.store_id}/` + this.pro_id + '/' + img.image_original;
  }

  featureImage(img) {
    this.loader = true;
    const img_data = {image_id: img.id, variants_products_id : this.selectedId.variants_products_id };
    this.inventoryS.makeFeatureImage(this.pro_id, img_data)
    .then(
      res => {
        this.loader = false;
        this.getImageList();
        this.alertS.success(this.alertContainer, 'Successfully updated as featured image', true, 5000);
      }
    ). catch (
      err => this.error(err, 'Someting worng! Please try again')
    );
  }

  error(err, message) {
    console.log(err);
    this.loader = false;
    Helpers.setLoading(false);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }


}
