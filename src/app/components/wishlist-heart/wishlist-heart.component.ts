import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ModalService } from '../../shared/services/modal.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-heart',
  templateUrl: './wishlist-heart.component.html',
  styleUrls: ['./wishlist-heart.component.scss']
})
export class WishlistHeartComponent implements OnInit {
  @Input() product?: IProduct;
  signup: boolean = false;
  statusLogin: boolean = false;
  name: string;
  email: string;
  password: string;
  userInfo: IUser;
  userID: string;
  wish: Array<IProduct> = [];
  patternName = /^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F\a-zA-Z\']{1,20}$/;
  patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  patternPassword = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
  status: boolean = false;
  constructor(private modalService: ModalService,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('mainUser')) {
      this.getUser();
    }
    this.check();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addProduct(): void {
    if (!localStorage.getItem('mainUser')) {
      if (window.innerWidth < 1050) {
        this.router.navigateByUrl('login');
      } else {
        this.openModal("sign-in-2");
      }
    } else {
      this.getUser();
      this.after();
    }
  }


  getUser(): void {
    const user = JSON.parse(localStorage.getItem('mainUser'));
    this.firestore.collection('users').ref.where('email', '==', user.email).onSnapshot(collection => {
      collection.forEach(doc => {
        this.userInfo = null;
        this.userInfo = doc.data() as IUser;
        this.userID = doc.id;
      })
    });
  }

  after(): void {
    setTimeout(() => {
      if (this.userInfo.wishlist.length == 0 || !this.userInfo.wishlist.find(pr => pr.id === this.product.id)) {
        this.userInfo.wishlist.push(this.product);
      } else {
        this.userInfo.wishlist.splice(this.userInfo.wishlist.findIndex(pr => pr.id === this.product.id), 1)
      }
      this.firestore.collection('users').doc(this.userID).update({ ...this.userInfo });
      localStorage.setItem('mainUser', JSON.stringify(this.userInfo));
      this.check();
    }, 500)
  }

  check(): void {

    if (localStorage.getItem('mainUser')) {
      if (JSON.parse(localStorage.getItem('mainUser')).wishlist.some(prod => prod.id === this.product?.id)) {
        this.status = true;
      } else {
        this.status = false;
      }
    } else {
      this.status = false;
    }
  }

  signUp(): void {
    this.signup = !this.signup;
  }

  register(form: NgForm): void {
    this.authService.signUp(form.controls.email.value, form.controls.password.value, form.controls.name.value);
    this.closeModal('sign-in');
    this.resetForm();
    this.statusLogin = true;
  }

  signIn(): void {
    this.authService.signIn(this.email, this.password);
    this.closeModal('sign-in-2');
    this.resetForm();
    this.statusLogin = true;
  }

  checkForm(): boolean {
    if (this.name !== undefined && this.email !== undefined && this.password !== undefined) {
      if (this.name.length > 3 && this.email.length > 10 && this.password.length >= 6) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    if (this.signup === true) {
      this.signUp();
    }
  }
}
