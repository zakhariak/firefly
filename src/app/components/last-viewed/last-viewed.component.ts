import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-last-viewed',
  templateUrl: './last-viewed.component.html',
  styleUrls: ['./last-viewed.component.scss']
})
export class LastViewedComponent implements OnInit {
  products: Array<IProduct> = [];
  bool: boolean;
  constructor() { }

  ngOnInit(): void {
    this.getLastViewedProduct();
  }

  getLastViewedProduct(): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('lastViewed')) {
      this.bool = true;
      localProducts = JSON.parse(localStorage.getItem('lastViewed'));
      this.products = localProducts;
    } else {
      this.bool = false;
    };
  }

  calcPrice(oldPrice: number, persent: number): number {
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
  }

}
