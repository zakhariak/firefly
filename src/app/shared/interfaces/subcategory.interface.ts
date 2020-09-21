import { ICategory } from "../interfaces/category.interface";

export interface ISubcategory {
    id: string;
    nameUA: string;
    nameEN: string;
    category: ICategory;
}