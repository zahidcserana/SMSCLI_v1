import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { EndPoint, product_image } from '../../../../../globals/endPoint/config';
import { InventoryService } from '../../inventory-serveice/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { SideBar_Related_Product } from '../product_models';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../../../../../modules/dialog-box/dialog-box.component';
import { Helpers } from '../../../../../helpers';
import { GET_STORE_ID } from '../../../../../globals/_classes/functions';


declare let $:any;

@Component({
  selector: 'product-sidbar-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit, OnDestroy {

  url:string;
  img_url:string = product_image;
  pro_id:number;
  productList:SideBar_Related_Product[] = [];
  selectedId = {
    related_product_id:null
  };
  loader:boolean;
  store_id = GET_STORE_ID();


  @ViewChild('hasCusAlert') alertContainer: ElementRef;


  constructor(
    private inventoryS:InventoryService,
    private alertS: AlertService,
    private activeRoute:ActivatedRoute,
    private modalService: NgbModal
  ) { 
    this.pro_id = this.inventoryS.getProId(this.activeRoute);
    this.productList = this.activeRoute.snapshot.data['list'].data;
    this.url = EndPoint + 'products/related/' + this.pro_id;
  }

  ngOnInit() {
    $('.native-routing-container').scrollTop(0, 0);
  }

  ngOnDestroy() {
    this.loadDetails(this.pro_id);
  }

  tarckProduct(index, elm) {
    return elm ? elm.id : null;
  }

  loadDetails(id) {
    const url: string = this.activeRoute.snapshot['_routerState'].url;
    if (url.includes('details/edit')) {
      this.inventoryS.reload({reload: true, id: id, from: 'RELATED', data: this.productList});
    }
  }

  changeValue(e){
    this.selectedId.related_product_id = e.id;
  }

  submitSearch() {
    this.loader = true;
    this.inventoryS.addRelatedProduct (this.pro_id,this.selectedId)
    .then (
      res => {
        this.loader = false;
        this.productList.push(res.result.data);
        this.alertS.success(this.alertContainer, 'Product has been successfully added', true, 5000);
        this.selectedId.related_product_id = null;
      })
    .catch(
      err => this.error(err, 'Something wrong! Product has been not added')
    );
  }


  deleteProduct(rel_id, index){
    const modalRef = this.modalService.open(DialogBoxComponent,{
      centered:true,
      size:'sm',
      windowClass: 'animated fadeIn'
    });
    modalRef.componentInstance.massage = 'Are you sure you want to delete?';
    modalRef.result
    .then((result)=>{
      if(result){
        Helpers.setLoading(true);
        this.archiveProduct(this.pro_id, rel_id, index);  
      }
    },(res)=>{
      console.log(res);
    });
  }

  archiveProduct(pro_id, id, index){
    this.inventoryS.deleteRelatedProduct(pro_id, id)
    .then(
      res=>{
          this.alertS.success(this.alertContainer, 'Product has been deleted', true, 5000); 
          this.productList.splice(index,1);
          Helpers.setLoading(false);
      })
    .catch(
      err => this.error(err, 'Something wrong! Product has been not deleted')
    );
  }

  error(err, message) {
    console.log(err);
    this.loader = false;
    Helpers.setLoading(false);
    this.alertS.error(this.alertContainer, message, true, 5000);
  }

}
