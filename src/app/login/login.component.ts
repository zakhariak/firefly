import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  loginForm: FormGroup;
  patternName = /^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F\a-zA-Z\']{1,20}$/;
  patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  patternPassword = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
  signup: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginIn();
  }

  loginIn(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl(''),
    });
  }

  submit(): void {
    const { userEmail, userPassword } = this.loginForm.value;
    this.authService.signIn(userEmail, userPassword);
  }
  signUp(): void {
    this.signup = !this.signup;
  }

  register(form: NgForm): void {
    this.authService.signUp(form.controls.email.value, form.controls.password.value, form.controls.name.value);
    this.resetForm();
    // this.statusLogin = true;
  }

  signIn(): void {
    this.authService.signIn(this.email, this.password);
    // this.closeModal('sign-in');
    this.resetForm();
    // this.statusLogin = true;
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
