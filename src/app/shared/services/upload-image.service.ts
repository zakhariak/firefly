import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private image: string;
  editStatus = new Subject<boolean>();

  constructor(private fireStorage: AngularFireStorage) { }

  putImage(img: string): void {
    this.image = img
  }

  getImage(): string {
    return this.image
  }

  editImage(bl: boolean, img?: string): void {
    this.editStatus.next(null);
    if (bl) { this.image = img } else { this.image = '' };
    this.editStatus.next(bl);
  }

  deleteImage(path: string): void {
    this.fireStorage.ref(this.fireStorage.storage.refFromURL(path).fullPath).delete();
  }
}
