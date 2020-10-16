import { ISubcategory } from './subcategory.interface';
import { ICategory } from './category.interface';
import { ITrademarks } from './trademarks.interface';

export interface IProduct {
    id: string;
    date: Date;
    productСode: number;
    name: string;
    subcategory: ISubcategory;
    category: ICategory;
    trademarks: ITrademarks;
    image: string;
    price: number;
    rating: Array<number>;
    deliveryDays: number;
    discountPercent: number;
    quantityInStock: number;
    count: number;
    characteristics?: Array<any>;
}
