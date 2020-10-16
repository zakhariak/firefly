import { IProduct } from './product.interface';

export interface IOrder {
    id: any;
    userLastName: string;
    userFirstName: string;
    userPhone: string;
    userEmail: string;
    delivery: string;
    ordersDetails: Array<IProduct>;
    dateOrder: string;
    userComment: string;
    status: string;
}