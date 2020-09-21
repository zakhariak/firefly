import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadImageService } from '../../shared/services/upload-image.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  uploadProgress: Observable<number>;
  image: string;
  imageStatus: boolean;

  constructor(private uploadService: UploadImageService,
    private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.checkEdit();
  }


  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const task = this.fireStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(image => {
      this.fireStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.uploadService.putImage(url);
        this.imageStatus = true;
        console.log(this.image);
      });
    });
  }

  deleteImage(path?: string): void {
    this.imageStatus = false;
    if (path) {
      this.uploadService.deleteImage(path);
    } else {
      this.uploadService.deleteImage(this.image);
    }
  }

  private checkEdit(): void {
    this.uploadService.editStatus.subscribe(
      (bl: boolean) => {
        this.image = this.uploadService.getImage();
        this.imageStatus = bl;
      }
    )
  }
}
