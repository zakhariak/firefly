import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any, searchText: any): unknown {
    if (!array) {
      return []
    };
    if (!searchText) {
      return array
    };
    return array.filter(elm => elm.name.toLowerCase().includes(searchText.toLowerCase()) || elm.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}
