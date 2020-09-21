import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  getProducts(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('products').snapshotChanges();
  }

  postProduct(product: IProduct): Promise<DocumentReference> {
    return this.firestore.collection('products').add({...product});
  }

  deleteProduct(id: any): void {
    this.firestore.collection('products').doc(id).delete();
  }

  updateProduct(product: IProduct): void {
    this.firestore.collection('products').doc(product.id).update(product);
  }
}
