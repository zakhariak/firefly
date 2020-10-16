import { ISubcategory } from '../interfaces/subcategory.interface';
import { ICategory } from "../interfaces/category.interface";
import { ITrademarks } from '../interfaces/trademarks.interface';
import { IProduct } from '../interfaces/product.interface';
import { IProdCharacter } from '../interfaces/product-characteristics.interface';


export class Product implements IProduct {
    constructor(
        public id: string,
        public date: Date,
        public productСode: number,
        public name: string,
        public subcategory: ISubcategory,
        public category: ICategory,
        public trademarks: ITrademarks,
        public image: string,
        public price: number,
        public rating: Array<number>,
        public deliveryDays: number,
        public discountPercent: number,
        public quantityInStock: number,
        public count: number,
        public characteristics?: Array<IProdCharacter>
    ) { }
}