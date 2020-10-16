import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  arrCategoryName: Array<string>;
  categoryName: string;
  arrayProducts: Array<IProduct>;
  chooseDisplay: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getCategoryCount();
  }

  getCategoryCount(): void {
    this.arrayProducts = [];
    let localProducts: Array<IProduct> = [];
    let arrayCatName: Array<string> = [];
    if (localStorage.length > 0 && localStorage.getItem('comparisonList')) {
      localProducts = JSON.parse(localStorage.getItem('comparisonList'));
      this.arrayProducts = localProducts;
      if (this.chooseDisplay === false) {
        localProducts.map(cat => { arrayCatName.push(cat.subcategory.nameUA) });
        this.arrCategoryName = arrayCatName.filter((item, index) => arrayCatName.indexOf(item) === index);
      }
    };
    console.log(this.arrayProducts);
    
  }

  getProducts(name: string): Array<IProduct> {
    const products = this.arrayProducts.filter(prod => prod.subcategory.nameUA.toLowerCase() === name.toLowerCase());
    return products
  }

  getValue(prod: IProduct, item: any): string {    
    const i = prod.characteristics.findIndex(el => el.name === item.name);
    if (i === -1) {
      return '-';
    } else {
      return prod.characteristics[i].select;
    }
  }

  calcPrice(oldPrice: number, persent: number): number {
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
  }

  deleteProduct(prod: IProduct): void {
    const i = this.arrayProducts.findIndex(p => p === prod);
    this.arrayProducts.splice(i, 1);
    localStorage.setItem('comparisonList', JSON.stringify(this.arrayProducts));
  }

  chooseD(): void {
    this.chooseDisplay = !this.chooseDisplay
  }

}
