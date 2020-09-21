import { ISubcategory } from './subcategory.interface';
import { ICategory } from './category.interface';
import { ITrademarks } from './trademarks.interface';
import { IProdCharacter } from './product-characteristics.interface';

export interface IProduct {
    id: any;
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
    characteristics?: Array<IProdCharacter>;

}
