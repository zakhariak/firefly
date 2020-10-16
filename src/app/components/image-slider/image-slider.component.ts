import { Component, OnInit } from '@angular/core';
import { ISlide } from '../../shared/interfaces/slide.interface';
import { SliderService } from '../../shared/services/slider.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  images: Array<ISlide> = [];
  constructor(private slideService: SliderService) { }

  ngOnInit(): void {
    this.getImages();
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
}
