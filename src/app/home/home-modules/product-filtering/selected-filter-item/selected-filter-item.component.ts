import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../home-service/product.service';

@Component({
  selector: 'selected-filter-item',
  templateUrl: './selected-filter-item.component.html',
  styleUrls: ['./selected-filter-item.component.css']
})
export class SelectedFilterItemComponent implements OnInit {
  list = [];
  constructor(private service: ProductService) {
    this.service.filterSettings.subscribe(res => {
      if (res.reload) {
        this.list = res.selected_category;
      }
    });
  }

  ngOnInit() {
  }
  removeItem(index, id) {
    const obj = { index: index, id: id };
    this.service.filterSettings.next({ isRemove: true, removeItem: obj });
  }
}
