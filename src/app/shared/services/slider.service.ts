import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ISlide } from '../interfaces/slide.interface';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private fireStore: AngularFirestore) { }

  getFirebaseImages(): Observable<DocumentChangeAction<unknown>[]> {
    return this.fireStore.collection('slider-images').snapshotChanges();
  }

  addFirebaseImage(img: ISlide): Promise<DocumentReference> {
    return this.fireStore.collection('slider-images').add(img);
  }

  deleteFirebaseImage(id): Promise<void> {
    return this.fireStore.collection('slider-images').doc(id).delete();
  }

  updateFirebaseImage(img: ISlide) {
    return this.fireStore.collection('slider-images').doc(img.id).update(img);
  }
}
