import { Component, IterableDiffers, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { IProdCharacter } from '../../shared/interfaces/product-characteristics.interface';
import { ITrademarks } from '../../shared/interfaces/trademarks.interface';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  p: number = 1;
  products: Array<IProduct> = [];
  anotherProducts: Array<IProduct> = [];
  character: Array<IProdCharacter> = [];
  brands: Array<ITrademarks> = [];
  brandCountry: Array<string> = [];
  brandFilter: string = '';
  filterPrice: Array<number> = [];
  minPrice: number = 0;
  maxPrice: number = 100000;
  pageTitle: string;
  pageLink: string;
  filtersArray = [];
  pageProducts: string;
  categoryName: string;
  subcategoryName: string;
  searchLength: number;
  countryFilter: string = '';
  num: number = 1;

  options: Options = {
    floor: 0,
    ceil: 100000,
    showSelectionBar: true
  };
  constructor(private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = '';
        this.subcategoryName = '';
        this.categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.subcategoryName = this.actRoute.snapshot.paramMap.get('subcategory');
        if (this.subcategoryName !== null) {
          if (this.categoryName === 'trademarks') {
            this.getByBrands(this.subcategoryName)
          } else {
            this.getProductsBySubategory(this.categoryName, this.subcategoryName);
          }
        } else {
          if (this.categoryName === 'promotional_offers') {
            this.getPromotionalOffers()
          } else {
            this.getProductsByCategory(this.categoryName);
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCharacteristicFilter();
    this.getBrandsFilter();

  }

  private getProductsByCategory(categoryName: string): void {
    this.products = [];
    this.firestore.collection('products').ref.where('category.nameEN', '==', categoryName).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          data.id = document.id;
          this.filterPrice.push(data.price);
          this.products.push({ ...data });
          this.anotherProducts.push({ ...data });
        });
        this.getPrice();
        this.pageTitle = this.products[0]?.category.nameUA;
        this.pageLink = this.products[0]?.category.nameEN;
      }
    );
    this.pageProducts = 'category';
  }

  private getProductsBySubategory(categoryName: string, subcategoryName: string): void {
    this.products = [];
    this.firestore.collection('products').ref.where('category.nameEN', '==', categoryName,).where('subcategory.nameEN', '==', subcategoryName).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          data.id = document.id;
          this.filterPrice.push(data.price);
          this.products.push({ ...data });
          this.anotherProducts.push({ ...data });
        });
        this.getPrice();
        this.pageTitle = this.products[0]?.category.nameUA + ' / ' + this.products[0]?.subcategory.nameUA;
        this.pageLink = this.products[0]?.category.nameEN + ' / ' + this.products[0]?.subcategory.nameEN;
      }
    );
    this.pageProducts = 'subcategory';
  }

  private getPromotionalOffers(): void {
    this.products = [];
    this.firestore.collection('products').ref.where('discountPercent', '>', '0').onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          data.id = document.id;
          this.filterPrice.push(data.price);
          this.products.push({ ...data });
          this.anotherProducts.push({ ...data });
        });
        this.getPrice();
        this.pageTitle = 'Акційні пропозиції';
        this.pageLink = 'promotional_offers';
      }
    );
    this.pageProducts = 'promotional_offers';
  }

  private getByBrands(brandName: string): void {
    this.products = [];
    this.firestore.collection('products').ref.where('trademarks.name', '==', brandName).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          data.id = document.id;
          this.filterPrice.push(data.price);
          this.products.push({ ...data });
          this.anotherProducts.push({ ...data });
        });
        this.getPrice();
      }
    );
    this.pageTitle = brandName;
    this.pageProducts = 'trademarks';
  }

  private getCharacteristicFilter(): void {
    this.character = [];
    this.firestore.collection('product-characteristics').snapshotChanges().subscribe(
      collection => {
        collection.map(document => {
          const data = document.payload.doc.data() as IProdCharacter;
          data.id = document.payload.doc.id;
          this.character.push({ ...data });
        });
      }
    );
  }

  private getBrandsFilter(): void {
    this.character = [];
    this.firestore.collection('trademarks').snapshotChanges().subscribe(
      collection => {
        collection.map(document => {
          const data = document.payload.doc.data() as ITrademarks;
          data.id = document.payload.doc.id;
          this.brands.push({ ...data });
          if (this.brandCountry.length == 0 || !this.brandCountry.includes(data.country)) {
            this.brandCountry.push(data.country);
          }
        });
      }
    );
  }

  calcPrice(oldPrice: number, persent: number, count?: number): number {
    this.searchLength = count;
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
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

  getPrice(): void {
    this.minPrice = (this.filterPrice.sort((a, b) => a - b)[0] - 10);
    this.maxPrice = (this.filterPrice.sort((a, b) => b - a)[0] + 10);
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

  restart(): void {
    if (this.pageProducts == 'promotional_offers') {
      this.getPromotionalOffers();
    } else if (this.pageProducts == 'trademarks') {
      this.getByBrands(this.subcategoryName);
    } else if (this.pageProducts == 'category') {
      this.getProductsByCategory(this.categoryName);
    } else if (this.pageProducts == 'subcategory') {
      this.getProductsBySubategory(this.categoryName, this.subcategoryName);
    }
  }

  clearAll(): void {
    this.brandFilter = '';
    this.minPrice = 0;
    this.maxPrice = 100000;
    this.countryFilter = '';
  }

  clearBrand(): void {
    this.brandFilter = ''
  }

  clearPrice(): void {
    this.minPrice = 0;
    this.maxPrice = 100000;
  }
  clearCountry(): void {
    this.countryFilter = '';
  }

  showNav(): void {
    if (this.num === 1) {
      document.getElementById('prodFilter').style.left = '0px';
      this.num++;
    } else {
      document.getElementById('prodFilter').style.left = '-250px';
      this.num = 1;
    }
  }

}
