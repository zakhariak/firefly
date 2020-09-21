import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getCategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('categories').snapshotChanges();
  }

  postCategory(category: ICategory): Promise<DocumentReference> {
    return this.firestore.collection('categories').add(category);
  }

  deleteCategory(id: any): void {
    this.firestore.collection('categories').doc(id).delete();
  }

  updateCategory(category: ICategory): void {
    this.firestore.collection('categories').doc(category.id).update(category);
  }
}
