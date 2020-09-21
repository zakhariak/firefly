import { ISubcategory } from '../interfaces/subcategory.interface';
import { ICategory } from "../interfaces/category.interface";

export class Subcategory implements ISubcategory {
    constructor(
        public id: any,
        public nameUA: string,
        public nameEN: string,
        public category: ICategory
    ) { }
}