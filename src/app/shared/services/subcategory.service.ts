import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { ISubcategory } from '../interfaces/subcategory.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private firestore: AngularFirestore) { }

  getSubcategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('subcategory').snapshotChanges();
  }

  postSubcategory(subcategory: ISubcategory): Promise<DocumentReference> {
    return this.firestore.collection('subcategory').add(subcategory);
  }

  deleteSubcategory(id: any): void {
    this.firestore.collection('subcategory').doc(id).delete();
  }

  updateSubcategory(subcategory: ISubcategory): void {
    this.firestore.collection('subcategory').doc(subcategory.id).update(subcategory);
  }
}
