import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-compare-button',
  templateUrl: './compare-button.component.html',
  styleUrls: ['./compare-button.component.scss']
})
export class CompareButtonComponent implements OnInit {
  @Input() product?: IProduct;

  constructor() { }

  ngOnInit(): void {
    this.check();
  }

  addProduct(): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('comparisonList')) {
      localProducts = JSON.parse(localStorage.getItem('comparisonList'));
      if (localProducts.some(prod => prod.id === this.product?.id)) {
        localProducts.splice(localProducts.findIndex(prod => prod.id === this.product?.id), 1);
      }
      else {
        localProducts.push(this.product);
      }
    }
    else {
      localProducts.push(this.product);
    }
    localStorage.setItem('comparisonList', JSON.stringify(localProducts));
    this.check();
  }

  check(): void {
    if (localStorage.getItem('comparisonList')) {
      if (JSON.parse(localStorage.getItem('comparisonList')).some(prod => prod.id === this.product?.id)) {
        document.getElementById('icon').classList.add('active');
      } else {
        document.getElementById('icon').classList.remove('active');
      }
    }
  }
}
