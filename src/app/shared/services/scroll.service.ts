import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollUpStatus = new Subject<boolean>();
  constructor() { }


  scrollUp() {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  scrollToElement(id: string): void {
    document.getElementById(`${id}`).scrollIntoView({ block: "center", behavior: "smooth" });
  }

  onScroll(event): void {
    (window.scrollY > 200) ? this.scrollUpStatus.next(true) : this.scrollUpStatus.next(false);
  }
}
