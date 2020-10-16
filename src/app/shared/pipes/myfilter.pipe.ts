import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyfilterPipe implements PipeTransform {

  transform(arr: Array<IProduct>, criteria: SortCriteria): Array<IProduct> {
    let array = [];
    array = arr.filter(el => el.price >= criteria.priceMin && el.price <= criteria.priceMax);
    
    if (criteria.country !== '' ) {
      array = array.filter(el => el.trademarks.country.toLowerCase() === criteria.country.toLowerCase());
    };
    if (criteria.brand !== '') {
      array = array.filter(el => el.trademarks.name.toLowerCase() === criteria.brand.toLowerCase());
    };


    return array;
  }

}

export interface SortCriteria {
  brand: string;
  country: string;
  priceMin: number;
  priceMax: number;
}
