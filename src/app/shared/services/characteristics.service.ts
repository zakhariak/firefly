import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProdCharacter } from '../interfaces/product-characteristics.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicsService {

  constructor(private firestore: AngularFirestore) { }

  getAllCharacteristics(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('product-characteristics').snapshotChanges();
  }

  addCharacteristic(characteristic: { name: string, select: Array<string> }): Promise<DocumentReference> {
    return this.firestore.collection('product-characteristics').add(characteristic);
  }

  deleteCharacteristic(id: any): void {
    this.firestore.collection('product-characteristics').doc(id).delete();
  }

  updateCharacteristic(characteristic: IProdCharacter): void {
    this.firestore.collection('product-characteristics').doc(characteristic.id).update(characteristic);
  }
}
