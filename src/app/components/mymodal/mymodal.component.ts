import { Component, OnInit, ElementRef, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MymodalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'my-modal-background') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    this.element.children[0].children[0].style.animationName = "moveOn";
    document.body.classList.add('my-modal-open');
  }

  close(): void {
    this.element.children[0].children[0].style.animationName = "moveOff";
    setTimeout(
      () => {
        this.element.style.display = 'none';
        document.body.classList.remove('my-modal-open');
      }, 250)
  }

}
