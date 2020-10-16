import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userStatusChanges = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              localStorage.setItem('mainUser', JSON.stringify(userRef.data()));
              if (userRef.data().role === 'admin' && userRef.data().access) {
                this.router.navigateByUrl('admin');
                this.userStatusChanges.next('admin');
              }
              else if (userRef.data().role == 'user') {
                this.router.navigateByUrl('profile');
                this.userStatusChanges.next('user');
              }
            });
          }
        );
      })
      .catch(err => alert(err.message));
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('mainUser');
        this.router.navigateByUrl('/home');
        this.userStatusChanges.next('logout');
      })
      .catch(err => (err));
  }

  signUp(email: string, password: string, name: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user: IUser = {
          id: userResponse.user.uid,
          firstName: name,
          lastName: '',
          email: userResponse.user.email,
          phone: '',
          wishlist: [],
          role: 'user'
        };
        this.firestore.collection('users').add(user)
          .then(data => {
            data.get()
              .then(user => {
                localStorage.setItem('mainUser', JSON.stringify(user.data()));
                this.router.navigateByUrl('profile');
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
