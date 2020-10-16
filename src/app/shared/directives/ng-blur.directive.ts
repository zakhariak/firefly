import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ng-blur]'
})
export class NgBlurDirective {

  constructor(private element: ElementRef) {

  }

  @HostListener('mouseleave') doSomething() {
    if (this.element.nativeElement.lastElementChild.classList.contains('showDrop')) {
      document.querySelector('.showDrop').classList.remove('showDrop');
    }
  }

}
