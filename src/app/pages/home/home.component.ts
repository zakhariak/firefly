import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<IProduct> = [];
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getPromotionalOffers();
  }

  private getPromotionalOffers(): void {
    this.products = [];
    this.firestore.collection('products').ref.where('discountPercent', '>', '0').onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          data.id = document.id;
          this.products.push({ ...data });
        });
      }
    );
  }

  calcPrice(oldPrice: number, persent: number): number {
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
  }

}
