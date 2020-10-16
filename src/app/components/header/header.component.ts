import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ModalService } from '../../shared/services/modal.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string;
  phone: string;
  comment: string;
  productsCount: number;
  bodyText: string;
  modal: boolean = false;
  patternName = /^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F\a-zA-Z\']{1,20}$/;
  blind: boolean = false;
  scroll: number;
  search: string;
  products: Array<IProduct> = [];
  showSearchBlock: boolean = false;

  constructor(private modalService: ModalService, private prodservice: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  postMessage(): void {
    console.log(this.name, this.phone, this.comment);
  }

  checkBasket() {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.length > 0) {
        const count = this.productsCount;
        this.productsCount = localProducts.length;
        if (this.productsCount > count && this.productsCount < count) {
          this.showMessage();
        }
        return true
      } else {
        this.productsCount = null;
        return false
      }
    }
  }

  showMessage(): void {
    document.getElementById('basket').style.animationName = 'shake';
    setTimeout(() => {
      document.getElementById('basket').style.animationName = '';
    }, 1000)
  }

  callMe(form: NgForm): void {
    console.log(form.controls.name.value, form.controls.phone.value);
  }

  checkKeyUp(): void {
    if (this.search.length > 2) {
      this.showSearchBlock = true;
    } else {
      this.showSearchBlock = false;
    }
  }

  getProducts(): void {
    this.products = [];
    this.prodservice.getProducts().subscribe(collection => {
      collection.forEach(doc => {
        const data = doc.payload.doc.data() as IProduct;
        data.id = doc.payload.doc.id;
        this.products.push({ ...data })
      })
    })
  }

  clearInputSearch(): void {
    this.search = '';
    this.showSearchBlock = false;
  }
}
