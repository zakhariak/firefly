import { Component, OnInit } from '@angular/core';
import { ISubcategory } from '../../shared/interfaces/subcategory.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  arrSubcategory: Array<ISubcategory> = [];
  nameCat: string = "";
  catLink: string = "";
  num: number = 1;
  shadow: boolean = false;
  compareCount: number;
  wishlistCount: number;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }


  getSubcategory(nameCategory: string): void {
    this.nameCat = nameCategory;
    this.arrSubcategory = [];
    this.firestore.collection('subcategory').ref.where('category.nameUA', '==', nameCategory.toLowerCase()).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as ISubcategory;
          data.id = document.id;
          this.catLink = data.category.nameEN;
          this.arrSubcategory.push({ ...data });
        })
      }
    )
    document.getElementById('menu').style.left = '-250px';
  }

  backSubmenu(): void {
    document.getElementById('menu').style.left = '0px';
  }

  showNav(): void {
    if (this.num === 1) {
      document.getElementById('shadow').style.width = '100%';
      document.getElementById('nav').style.left = '0px';
      document.getElementById('shadow').style.opacity = '1';
      this.num++;
    } else {
      document.getElementById('nav').style.left = '-250px';
      document.getElementById('shadow').style.opacity = '0';
      document.getElementById('shadow').style.width = '0%';
      this.num = 1;
      document.getElementById('menu').style.left = '0px';
    }
  }

  checkLocalStorage(): boolean {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('comparisonList')) {
      localProducts = JSON.parse(localStorage.getItem('comparisonList'));
      if (localProducts.length > 0) {
        this.compareCount = localProducts.length;
        return true
      }
      else {
        this.compareCount = null;
        return false
      }
    }

  }

  checkWishlist(): boolean {
    if (localStorage.getItem('mainUser')) {
      const user = JSON.parse(localStorage.getItem('mainUser')) as IUser;
      this.wishlistCount = user.wishlist.length;
      return true
    } else {
      this.wishlistCount = null;
      return false
    }
  }

  checkUser(): boolean {
    if (localStorage.getItem('mainUser')) {
      return true;
    } else {
      return false;
    }
  }

}
