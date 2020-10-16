import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], criteria: SortCriteria): any[] {
    if (criteria.simple) {
      return array.sort((a, b) => {
        let nameA = a[criteria.value].toLowerCase();
        let nameB = b[criteria.value].toLowerCase();
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
      });
    } else if (!criteria.simple) { }
  }

}

export interface SortCriteria {
  simple: boolean;
  value: string
}