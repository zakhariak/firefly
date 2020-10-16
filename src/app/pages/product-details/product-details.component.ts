import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ITrademarks } from '../../shared/interfaces/trademarks.interface';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  productCode: number;
  productBrand: ITrademarks;
  showCharact: boolean = false;
  num: number = 1;

  constructor(private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private scroll: ScrollService) { }

  ngOnInit(): void {
    this.getMyProduct();
    setTimeout(() => {
      this.addLocalViewed();
    }, 2000)
  }

  getMyProduct(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.firestore.collection('products').doc(id).get().subscribe(
      document => {
        const data = document.data() as IProduct;
        data.id = document.id
        this.product = data;
        this.productCode = data.productСode;
        this.productBrand = data.trademarks
      }
    );
  }

  addLocalViewed(): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('lastViewed')) {
      localProducts = JSON.parse(localStorage.getItem('lastViewed'));
      if (localProducts.some(prod => prod.id === this.product.id)) {
      }
      else {
        localProducts.push(this.product);
      }
    }
    else {
      localProducts.push(this.product);
    }
    localStorage.setItem('lastViewed', JSON.stringify(localProducts));
  }

  getValue(name: string): any {
    const index = this.product?.characteristics.findIndex(n => n.name === name);
    return this.product?.characteristics[index].select;
  }

  addBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    product.count = 1;
  }

  calcPrice(oldPrice: number, persent: number): number {
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
  }

  scrollTo(): void {
    if (this.showCharact === false) {
      this.showCharact = true;
      setTimeout(() => {
        this.scroll.scrollToElement('allCharacteristics');
      }, 300);
      this.num++
    } else if (this.showCharact === true) {
      this.showCharact = false;
    }
  }

}
