import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[NgGetValue]'
})
export class NgGetValueDirective {

  constructor(private el: ElementRef) {

  }
}
