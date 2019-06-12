import { Component, OnInit, Input, HostListener } from '@angular/core';
import { formatValue, formatListPrice } from '../../../../globals/_classes/functions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-featured-layout2',
  templateUrl: './featured-layout2.component.html',
  styleUrls: ['./featured-layout2.component.css']
})
export class FeaturedLayout2Component implements OnInit {
  @Input() actualValue;
  @Input() type: string;

  grid = { s: 1, c: 12 };
  list = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.format();
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.format();
    // console.log(this.list);   
  }

  trackProduct(index, item) {
    return item.id ? item.id : null;
  }

  formatPrice(price) {
    return formatListPrice(price);
  }

  private format() {
    const data = formatValue(this.actualValue);
    if (data) {
      this.list = data.product;
      this.grid = data.grid;
    }
  }

  goToDetails(pro) {
    this.router.navigateByUrl(`/product/${pro.uuid}/${pro.url}`);
  }

}
