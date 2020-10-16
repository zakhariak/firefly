import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: Array<IProduct> = [];
  p: any;

  constructor() { }

  ngOnInit(): void {
    this.getWishlist();
  }
  getWishlist(): void {
    if (localStorage.getItem('mainUser')) {
      const user = JSON.parse(localStorage.getItem('mainUser')) as IUser;
      this.wishlist = user.wishlist;
    }
  }

  addBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      localProducts.push(product);
    } else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
  }

  deleteBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.length > 1) {
        const index = localProducts.findIndex(p => p.id === product.id);
        localProducts.splice(index, 1);
        localStorage.setItem('myOrder', JSON.stringify(localProducts));
      } else {
        localStorage.removeItem('myOrder');
      }
    }
  }

  checkBasket(product: IProduct) {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)) {
        return true
      } else {
        return false
      }
    }
  }

  deleteWithWishlist(product: IProduct): void {
    if (this.wishlist.length >= 1) {
      const user = JSON.parse(localStorage.getItem('mainUser')) as IUser;
      const index = this.wishlist.findIndex(p => p.id === product.id);
      this.wishlist.splice(index, 1);
      user.wishlist = this.wishlist;
      localStorage.setItem('mainUser', JSON.stringify(user));
    }
  }

}
