import { Component, OnInit, TemplateRef } from '@angular/core';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-admin-archive',
  templateUrl: './admin-archive.component.html',
  styleUrls: ['./admin-archive.component.scss']
})
export class AdminArchiveComponent implements OnInit {
  orders: Array<IOrder> = [];
  allSum: number = 0;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  oneOrder: IOrder;
  orderID: string;
  prodArray: Array<IProduct> = [];
  totalPrice: number;

  constructor(private orderService: OrderService,
    private modalService: BsModalService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getOrders();
  }

  openModal(template: TemplateRef<any>, id: string, bl: boolean): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg modal-dialog-centered' });
    this.getOneOrder(id);
    this.orderID = id;
  }

  openDeleteModal(template: TemplateRef<any>): void {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  private getOrders(): void {
    this.orders = [];
    this.orderService.getFirebaseOrders().subscribe(
      collection => {
        collection.map(order => {
          const data = order.payload.doc.data() as IOrder;
          data.id = order.payload.doc.id;
          if (data.status == 'архів') {
            this.orders.push({ ...data });
          }
        })
      }
    )
  }

  getOneOrder(id: string): void {
    this.oneOrder = null;
    this.firestore.collection('orders').doc(id).get().subscribe(
      document => {
        const data = document.data() as IOrder;
        data.id = document.id
        this.oneOrder = data;
        this.prodArray = data.ordersDetails;
        this.totalPrice = this.sumPrice(data);
      }
    );
  }

  sumPrice(pr?: IOrder): number {
    let sum = 0;
    this.allSum = 0;
    pr.ordersDetails.map(or =>
      (or.discountPercent == 0) ? sum += (or.count * or.price) : sum += (or.count * (or.price * (1 - or.discountPercent / 100))))
    this.allSum += sum
    return Math.round(this.allSum);
  }

  deleteOrder() {
    this.orderService.deleteFirebaseOrder(this.orderID)
      .then(() => this.getOrders())
      .catch((err) => console.log(err));
    this.modalRef2.hide();
    this.modalRef.hide();
  }

}
