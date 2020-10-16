import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  count: Subject<number> = new Subject<any>();
  constructor(private fireStore: AngularFirestore) { }

  getFirebaseOrders(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireStore.collection('orders').snapshotChanges();
  }

  addFirebaseOrder(order: IOrder): Promise<DocumentReference> {
    return this.fireStore.collection('orders').add(order);
  }

  deleteFirebaseOrder(id: string): Promise<void> {
    return this.fireStore.collection('orders').doc(id).delete();
  }

  updateFirebaseOrder(order: IOrder) {
    return this.fireStore.collection('orders').doc(order.id).update(order);
  }
}
