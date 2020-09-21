import { Component, OnInit, HostListener } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-arrow-up',
  templateUrl: './arrow-up.component.html',
  styleUrls: ['./arrow-up.component.scss']
})
export class ArrowUpComponent implements OnInit {
  scroll: boolean;
  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  private checkUp(event): void {
    this.scrollService.onScroll(event);
  }


  getScroll(): void {
    this.scrollService.scrollUp();
  }

  private checkScroll(): void {
    this.scrollService.scrollUpStatus.subscribe(
      (boolean) => {
        this.scroll = boolean;
      }
    );
  }

  //потрібно для роботи в інших компонентах
  // @HostListener('window:scroll', ['$event'])
  // private checkUp(event): void {
  //   this.scrollService.onScroll(event);
  // }
}
