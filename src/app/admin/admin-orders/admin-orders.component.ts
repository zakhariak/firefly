import { Component, OnInit, TemplateRef } from '@angular/core';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  newOrders: Array<IOrder> = [];
  workOrders: Array<IOrder> = [];
  allSum: number = 0;
  oneOrder: IOrder;
  prodArray: Array<IProduct> = [];

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  showDetails: boolean;
  deleteProd: boolean = false;
  totalPrice: number;

  orderID: string;
  delProd: IProduct;

  constructor(private orderService: OrderService,
    private modalService: BsModalService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getOrders();
    this.checkCount();
  }

  openModal(template: TemplateRef<any>, id: string, bl: boolean): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg modal-dialog-centered' });
    this.getOneOrder(id);
    this.orderID = id;
    this.showDetails = bl;
  }

  openDeleteModal(template: TemplateRef<any>, bl: boolean, del?: IProduct): void {
    this.modalRef2 = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
    if (bl) {
      this.delProd = del
      this.deleteProd = true;
    }
  }

  private getOrders(): void {
    this.newOrders = [];
    this.workOrders = [];
    this.orderService.getFirebaseOrders().subscribe(
      collection => {
        collection.map(order => {
          const data = order.payload.doc.data() as IOrder;
          data.id = order.payload.doc.id;
          if (data.status == 'в обробці') {
            this.newOrders.push({ ...data });
          } else if (data.status == 'прийнято') {
            this.workOrders.push({ ...data });
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

  deleteOrder() {
    this.orderService.deleteFirebaseOrder(this.orderID)
      .then(() => this.getOrders())
      .catch((err) => console.log(err));
    this.modalRef2.hide();
    this.modalRef.hide();
  }

  saveUserOrder(el: any): void {
    this.newOrders = [];
    this.workOrders = [];
    if (typeof el === 'string') {
      this.oneOrder.status = el;
    } else if (typeof el === 'object') {
      this.prodArray.splice(this.prodArray.findIndex(el => el == this.delProd), 1);
      this.oneOrder.ordersDetails = el;
      this.delProd = null;
    }
    const order = this.oneOrder;
    this.orderService.updateFirebaseOrder({ ...order });
    this.modalRef.hide();
    this.getOrders();
  }

  sumPrice(pr?: IOrder): number {
    let sum = 0;
    this.allSum = 0;
    pr.ordersDetails.map(or =>
      (or.discountPercent == 0) ? sum += (or.count * or.price) : sum += (or.count * (or.price * (1 - or.discountPercent / 100))))
    this.allSum += sum
    return Math.round(this.allSum);
  }

  private checkCount(): void {
    this.orderService.count.subscribe(
      () => {
        this.totalPrice = this.sumPrice(this.oneOrder);
      }
    );
  }
}
