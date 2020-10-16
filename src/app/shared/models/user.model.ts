import { IUser } from '../interfaces/user.interface';
import { IProduct } from '../interfaces/product.interface';


export class User implements IUser {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public wishlist: Array<IProduct>,
        public role: string
    ) { }
}