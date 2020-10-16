import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  month: Array<string> = ['Січ', 'Лют', 'Берез', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Верес', 'Жовт', 'Листоп', 'Груд'];
  orders: Array<IProduct> = [];
  orderID = 1;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  delivery: string = 'Спосіб доставки';
  comments: string = '';
  status: string = 'оформлення';
  alertphone: boolean = true;
  blind: boolean = false;
  emptyBasket: boolean = false;
  patternName = /^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F\a-zA-Z\']{1,20}$/;
  patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private firestore: AngularFirestore, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
  }

  private getBasket(): void {
    this.emptyBasket = true;
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.emptyBasket = false;
      this.orders = JSON.parse(localStorage.getItem('myOrder'));
    }
    if (localStorage.getItem('mainUser')) {
      const user = JSON.parse(localStorage.getItem('mainUser'));
      this.firstName = user.firstName ? user.firstName : '';
      this.lastName = user.lastName ? user.lastName : '';
      this.email = user.email ? user.email : '';
      this.phone = user.phone ? user.phone : '';
    }
  }

  calcPrice(oldPrice: number, persent: number): number {
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
  }

  sumPrice(): number {
    let sum = 0;
    this.orders.map(pr => {
      (pr.discountPercent == 0) ? sum += (pr.count * pr.price) : sum += (pr.count * (pr.price * (1 - pr.discountPercent / 100)))
    })
    return Math.round(sum);
  }

  focusEvent(event): void {
    if (event.type === 'focus') {
      event.target.previousSibling.style.animationName = 'moveOn';
      event.target.style.paddingTop = '16px';
      if (event.target.name == 'phone') {
        this.blind = true;
      };

    } else if (event.type === 'blur') {
      if (event.target.value.length == 0) {
        event.target.previousSibling.style.animationName = 'moveOff';
        event.target.style.paddingTop = '15px';
      }
      if (event.target.name == 'phone') {
        this.checkPhone();
        if (this.phone == undefined || this.phone.length == 0) {
          event.target.previousSibling.style.animationName = 'moveOff';
          event.target.style.paddingTop = '15px';
          this.blind = false;
          this.alertphone = true;
        }
      };
    }
  }

  checkPhone(): void {
    if (this.phone !== undefined) {
      if (this.phone.length == 10) {
        if (this.phone[0] == '0') {
          this.alertphone = true
        } else {
          this.alertphone = false
        }
      } else {
        this.alertphone = false
      }
    }
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
        this.emptyBasket = true;
      }
    }
    this.getBasket();
  }

  checkForm(): boolean {
    if (this.firstName !== undefined && this.lastName !== undefined && this.email !== undefined && this.phone !== undefined) {
      if (this.firstName.length > 3 && this.lastName.length > 3 && this.email.length > 10 && this.phone.length == 10 && this.delivery !== 'Спосіб доставки') {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  addOrder(form: NgForm): void {
    const d = new Date(Date.now());
    let hours = (d.getHours().toString().length == 1) ? `0${d.getHours()}` : `${d.getHours()}`;
    let minutes = (d.getMinutes().toString().length == 1) ? `0${d.getMinutes()}` : `${d.getMinutes()}`
    let seconds = (d.getSeconds().toString().length == 1) ? `0${d.getSeconds()}` : `${d.getSeconds()}`
    const date = `${d.getDate()} ${this.month[d.getMonth()]}.${d.getFullYear()}, ${hours}:${minutes}:${seconds}`;
    const order = new Order(
      this.orderID,
      form.controls.lastName.value,
      form.controls.firstName.value,
      form.controls.phone.value,
      form.controls.email.value,
      form.controls.delivery.value,
      this.orders,
      date,
      form.controls.comments.value);
    delete order.id;
    this.orderService.addFirebaseOrder({ ...order });
    this.resetBasket();
  }

  resetBasket(): void {
    localStorage.removeItem('myOrder');
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phone = "";
    this.delivery = "Спосіб доставки";
    this.comments = "";
    this.getBasket();
  }
}
