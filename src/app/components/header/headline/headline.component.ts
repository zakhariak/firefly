import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { ModalService } from '../../../shared/services/modal.service';
import { NgForm } from '@angular/forms';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  urlName: string;
  menuName: string;
  statusLogin: boolean = false;
  compareCount: number;
  patternName = /^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F\a-zA-Z\']{1,20}$/;
  patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  patternPassword = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
  signup: boolean = false;
  wishlistCount: number = 0;

  constructor(private authService: AuthService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.updateCheckUser();
  }

  checkUser(): boolean {
    if (!localStorage.getItem('mainUser')) {
      return true
    } else {
      return false
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  private updateCheckUser(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        const user = JSON.parse(localStorage.getItem('mainUser'));
        if (user != null) {
          if (user.role === 'admin') {
            this.urlName = 'admin';
            this.menuName = 'Адмін';
            this.statusLogin = true;
          }
          else if (user.role === 'user') {
            this.urlName = 'profile';
            this.menuName = 'Особистий кабінет';
            this.statusLogin = true;
          }
        }
        else {
          this.statusLogin = false;
          this.urlName = '';
          this.menuName = '';
        }
      })
    if (localStorage.getItem('mainUser')) {
      const user = JSON.parse(localStorage.getItem('mainUser'));
      if (user != null) {
        if (user.role === 'admin') {
          this.urlName = 'admin';
          this.menuName = 'Адмін';
          this.statusLogin = true;
        }
        else if (user.role === 'user') {
          this.urlName = 'profile';
          this.menuName = 'Особистий кабінет';
          this.statusLogin = true;
        }
      }
      else {
        this.statusLogin = false;
        this.urlName = '';
        this.menuName = '';
      }
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
    this.closeModal('sign-in');
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
}
