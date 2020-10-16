import { IProduct } from './product.interface';
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    wishlist: Array<IProduct>;
    role: string;
}
