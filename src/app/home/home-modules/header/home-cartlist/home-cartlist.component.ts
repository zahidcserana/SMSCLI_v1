import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../../home-service/cart.service';
import { CartItem, Cart } from '../../type.model';
import { Router } from '@angular/router';
import { product_image } from '../../../../globals/endPoint/config';


@Component({
  selector: 'home-cartlist',
  templateUrl: './home-cartlist.component.html',
  styleUrls: ['./home-cartlist.component.css']
})
export class HomeCartlistComponent implements OnInit {
  img_url=product_image;
  @Input() cartItems: CartItem[] = [];
  @Input() total = 0;
  @Input() contents: any;
  constructor(
    private router: Router,
    private service: CartService) {
  }

  ngOnInit() {
    // console.log(this.contents);
  }
  removeCart(item: CartItem) {
    this.service.removeCart(item);
  }

  navigateToCart() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl('/cart/' + token);
    }

  }

}
