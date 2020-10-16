import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-product-count',
  templateUrl: './product-count.component.html',
  styleUrls: ['./product-count.component.scss']
})
export class ProductCountComponent implements OnInit {
  @Input() product?: IProduct;
  counter = 1;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.checkCount();
  }

  @Input()
  productCount(status: boolean): void {
    if (status) {
      this.product.count++;
    } else {
      if (this.product.count > 1) {
        this.product.count--;
      }
    }
    this.counter = this.product.count;
    this.orderService.count.next(+this.counter);
  }

  private checkCount(): void {
    if (this.product?.count == null) {
      this.counter = 1;
    } else {
      this.counter = this.product?.count;
    }
  }

  onEvent(event: KeyboardEvent): void {
    if (event.key == 'Enter') {
      this.product.count = this.counter;
    }
  }
}
