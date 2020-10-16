import { Component, OnInit, TemplateRef } from '@angular/core';
import { SliderService } from '../../shared/services/slider.service';
import { UploadImageService } from '../../shared/services/upload-image.service';
import { Slide } from '../../shared/models/slide.model';
import { ISlide } from '../../shared/interfaces/slide.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-slider',
  templateUrl: './admin-slider.component.html',
  styleUrls: ['./admin-slider.component.scss']
})
export class AdminSliderComponent implements OnInit {
  modalRef: BsModalRef;
  images: Array<ISlide> = [];
  id: string = '1';
  bigImage: string;

  constructor(private slideService: SliderService,
    private uploadService: UploadImageService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getImages();
  }

  openModal(template: TemplateRef<any>, img: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl modal-dialog-centered' });
    this.bigImage = img;
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  private getImages(): void {
    this.images = [];
    this.slideService.getFirebaseImages().subscribe(
      collection => {
        this.images = collection.map(img => {
          const data = img.payload.doc.data() as ISlide;
          data.id = img.payload.doc.id;
          return data
        })
      }
    )
  }

  addImage(): void {
    if (this.uploadService.getImage()) {
      const image = this.uploadService.getImage();
      const newImg = new Slide(this.id, image)
      delete newImg.id;
      this.slideService.addFirebaseImage({ ...newImg })
    }
    console.log(this.uploadService.getImage());

    this.uploadService.editImage(false);
  }

  deleteImage(img: ISlide) {
    this.slideService.deleteFirebaseImage(img.id);
    this.uploadService.deleteImage(img.link)
  }
}
