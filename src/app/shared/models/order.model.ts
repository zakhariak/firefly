import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';

export class Order implements IOrder {
    constructor(
        public id: any,
        public userLastName: string,
        public userFirstName: string,
        public userPhone: string,
        public userEmail: string,
        public delivery: string,
        public ordersDetails: Array<IProduct>,
        public dateOrder: string,
        public userComment: string,
        public status: string = 'в обробці',
    ) { }
}
