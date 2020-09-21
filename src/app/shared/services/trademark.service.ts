import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { ITrademarks } from '../interfaces/trademarks.interface';

@Injectable({
  providedIn: 'root'
})
export class TrademarkService {

  constructor(private firestore: AngularFirestore) { }

  getTrademarks(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('trademarks').snapshotChanges();
  }

  postTrademark(trademark: ITrademarks): Promise<DocumentReference> {
    return this.firestore.collection('trademarks').add(trademark);
  }

  deleteTrademark(id: any): void {
    this.firestore.collection('trademarks').doc(id).delete();
  }

  updateTrademark(trademark: ITrademarks): void {
    this.firestore.collection('trademarks').doc(trademark.id).update(trademark);
  }
}
