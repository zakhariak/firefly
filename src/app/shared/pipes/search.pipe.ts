import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any, field: string, searchText: string): any {
    if (!array) {
      return []
    };
    if (!searchText) {
      return array
    };
    return array.filter(elm => elm[field].toLowerCase().includes(searchText.toLowerCase()));
  }

}
