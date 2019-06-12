import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pagi } from '../../../modules/pagination/pagi.model';
import { AlertService } from '../../../modules/alert/alert.service';
import { ProductWizardService } from './product-wizard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-wizard',
  templateUrl: './product-wizard.component.html',
  styleUrls: ['./product-wizard.component.css']
})
export class ProductWizardComponent implements OnInit {

  pagi: Pagi = new Pagi();
  loader: boolean;
  totalPages: number = 0;
  productList = [];
  typeList = [];
  typeValue;
  tagList = [];
  tagvalue = [];
  proName: string;
  typeId: number;
  typeSettings;
  tagSettings;
  selectedTag = [];
  selectedType = [];
  addClick;
  tyChange: boolean;
  sendItems = [];
  induAdd: number;
  allAdd: boolean;



  @ViewChild('hasCusAlert') alertContainer: ElementRef;

  constructor(
    private alertS: AlertService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: ProductWizardService
  ) {
    this.loader = true;
    this.pagi.page = 1;
    this.getTypes();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.typeId = +this.activeRoute.snapshot.paramMap.get('id');
    this.selectedType.push(this.typeId);
    this.getTags();
    this.typeSettings = this.service.typeSettings;
    this.tagSettings = this.service.tagSettings;
  }

  //  ********************** Selecty Change *****************

  onTypeSelect(v) {
    this.selectedType.push(v.id);
    this.getTags();
  } 

  onTypeUnSelect(v) {
    const index = this.selectedType.indexOf(v.id);
    this.selectedType.splice(index, 1);
    this.getTags();
  }

  onTagSelect(v) {
    this.selectedTag.push(v.id);
    this.getProductList();
  }

  onTagUnSelect(v) {
    const index = this.selectedTag.indexOf(v.id);
    this.selectedTag.splice(index, 1);
    if(this.selectedTag.length > 0) {
      this.getProductList();
    } else {
      this.productList = [];
      this.pagi.page = 1;
      this.pagi.total = 0;
      this.totalPages = 0;
      this.sendItems = [];
    }
  }

  // **************** Get Call ************************

  private getTypes() {
    this.service.getAllType().subscribe(
      res => {
        this.typeList = res;
        const val = this.typeList.filter( f => this.typeId === f.id);
        this.typeValue = val ? val : null;
      }
    );
  }

  private getTags() {
    const params = this.selectedType.join(',');
    this.tyChange = true;
    this.service.getAllTag(params).subscribe(
      res => {
        this.tagList = res;
        this.tagvalue = res;
        this.selectedTag = res.map( m => m.id);
        this.getProductList();
        this.tyChange = false;
      }
    );
  }

  private getProductList() {
    this.loader = true;
    const param = this.selectedTag.join(',');
    this.service.getProductList(this.pagi.page, param).subscribe(
      res => {
        this.sendItems = [];
        this.productList = this.productList.concat(res.data.map( m => {
          m['check'] = false; 
          m['price'] = m['weekly_price']; 
          return m;
        }));
        this.loader = false;
        this.totalPages = res.total ? Math.ceil(res.total / 50) : 0;
        this.pagi.total = res.total ? res.total : 0;
        this.pagi.page = res.page_no ? +res.page_no : 1;
      }, err => this.loader = false
    );
  }


  trackPro(index, pro) {
    return pro ? pro.id : null;
  }

  // ****************** Checkbox *******************

  checkAll(e) {
    if(e.target.checked) {
      this.checkUncheck(true);
      this.productList = this.productList.map((m) => {
        m.check = true;
        return m;
      });
      this.sendItems = this.productList;
    } else {
      this.checkUncheck(false);
    }
  }

  checkUncheck(d) {
    this.productList = this.productList.map((m) => {
      m['check'] = d;
      return m;
    });
    this.sendItems = [];
  }

  checkOne(e, i) {
    this.productList[i]['check'] = e.target.checked;
    this.sendItems = this.productList.filter((f) => {
      return f['check'];
    });
  }

  addNewProduct() {
    if(this.proName) {
      this.productList.splice(0, 0, this.service.getInitProduct(this.proName));
      this.proName = null;
    }
  }

  copyRow(pro, i) {
    const newPro = JSON.parse(JSON.stringify(pro));
    newPro.name = pro.name + '(new)';
    this.productList.splice(i+1, 0, newPro);
  }

  cancel() {
    this.router.navigateByUrl('/admin/inventory');
  }

  addProduct(pro?, i?) {
    if(pro) {
      this.sendItems = [pro];
      this.induAdd = i;
      this.saveProduct(i);
    } else {
      if(this.sendItems.length > 0) {
        this.allAdd = true;
        this.saveProduct();
      } else {
        this.alertS.info(this.alertContainer, 'Select at-least one record!', true, 3000);
      }
    }
  }

  private saveProduct(i?) {
    this.service.addProduct(this.sendItems).then(
      res => {
        console.log(res);
        if(res.status === 'OK') {
          if(i) {
            this.productList.splice(i, 1);
          } else {
            this.removeFromList();
          }
          this.alertS.success(this.alertContainer, 'You have successfully added inventory in your store!', true, 3000);
          this.sendItems = [];
        } else {
          this.alertS.error(this.alertContainer, res.result.error, true, 3000);
        }
        this.allAdd = false;
        this.induAdd = null;
      }
    ).catch(
      err => {
        this.allAdd = false;
        this.induAdd = null;
        this.alertS.error(this.alertContainer, 'Something went wrong!!! Please try again.', true, 3000);
      }
    );
  }

  private removeFromList() {
    if(this.sendItems.length === this.productList.length) {
      this.productList = [];
    } else {
      for(let s of this.sendItems) {
        const ind = this.productList.findIndex( f => f.name === s.name);
        if(ind > -1) {
          this.productList.splice(ind, 1);
        }
      }
    }
  }


  // ***************** Custom Pagination ***********************

  pageChange() {
    this.pagi.page++;
    if (this.pagi.page > 0 && this.pagi.page <= this.totalPages) {
      this.getProductList();
    }
  }

}
