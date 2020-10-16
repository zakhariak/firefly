import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrder } from '../shared/interfaces/order.interface';
import { IProduct } from '../shared/interfaces/product.interface';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mainPhone: string;
  userID: string;
  userOrders: Array<IOrder> = [];
  userWishlist: Array<IProduct> = [];
  patternName = /^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F\a-zA-Z\']{1,20}$/;
  patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  readOnly: boolean = true;


  constructor(private auth: AuthService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.userInfo = [];
    const user = JSON.parse(localStorage.getItem('mainUser'));
    this.firestore.collection('users').ref.where('email', '==', user.email).onSnapshot(collection => {
      collection.forEach(doc => {
        const d = doc.data() as IUser;
        this.userInfo = doc.data();
        this.userID = doc.id;
        this.firstName = d.firstName ? d.firstName : '';
        this.lastName = d.lastName ? d.lastName : '';
        this.email = d.email ? d.email : '';
        this.mainPhone = d.phone ? d.phone : '';
        this.phone = d.phone ? `+38(${d.phone.slice(0, 3)})-${d.phone.slice(3, 5)}-${d.phone.slice(5, 7)}-${d.phone.slice(7)}` : '';
        this.userWishlist = d.wishlist;
        this.getUserOrders();
      })
    });
  }

  editSave(): void {
    this.readOnly = !this.readOnly;
    if (this.readOnly) {
      let user = this.userInfo;
      user.firstName = this.firstName;
      user.lastName = this.lastName;
      user.email = this.email;
      user.phone = this.mainPhone;
      this.firestore.collection('users').doc(this.userID).update({ ...user });
    }
  }

  private getUserOrders(): void {
    this.userOrders = [];
    if (this.userInfo.phone) {
      this.firestore.collection('orders').ref.where('userPhone', '==', this.userInfo.phone).onSnapshot(collection => {
        collection.forEach(doc => {
          const o = doc.data() as IOrder;
          o.id = doc.id;
          this.userOrders.push({ ...o });
        })
      });
    }
  }

  sumPrice(order: IOrder): number {
    let sum = 0;
    order.ordersDetails.map(pr => {
      (pr.discountPercent == 0) ? sum += (pr.count * pr.price) : sum += (pr.count * (pr.price * (1 - pr.discountPercent / 100)))
    })
    return sum
  }

  showOrders(event): void {
    if (event.target.nextElementSibling.style.display === 'table') {
      event.target.nextElementSibling.style.display = 'none'
      event.target.children[0].children[0].style.transform = "rotate(0deg)"
      event.target.children[1].children[0].style.transform = "rotate(0deg)"
    } else {
      event.target.nextElementSibling.style.display = "table";
      this.getUserOrders();
      event.target.children[0].children[0].style.transform = "rotate(180deg)"
      event.target.children[1].children[0].style.transform = "rotate(-180deg)"
    }
  }


  signOut(): void {
    this.auth.signOut();
  }

  calcPrice(oldPrice: number, persent: number): number {
    const pers = 1 - (persent / 100);
    const sum = (oldPrice * pers);
    return Math.round(sum);
  }
  deleteWithWishlist(product: IProduct): void {
    if (this.userWishlist.length >= 1) {
      const user = JSON.parse(localStorage.getItem('mainUser')) as IUser;
      const index = this.userWishlist.findIndex(p => p.id === product.id);
      this.userWishlist.splice(index, 1);
      user.wishlist = this.userWishlist;
      localStorage.setItem('mainUser', JSON.stringify(user));
    }
  }
}
