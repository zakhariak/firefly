import { Pipe, PipeTransform } from '@angular/core';
import { ISubcategory } from '../interfaces/subcategory.interface';

@Pipe({
  name: 'divide'
})
export class DividePipe implements PipeTransform {

  transform(array: Array<ISubcategory>, part: number): Array<ISubcategory> {
    if (part == 1) {
      if (array.length <= 6) {
        if (!(array.length % 2)) {
          console.log('work1');
          const ar = array.slice(0, 3);
          console.log(ar);
          return ar;
        } else {
          console.log('work2');
          return array.slice(0, array.length / 2)
        }
      }
    } else if (part == 2) {
      if (array.length > 6) {
        if (!(array.length % 2)) {
          console.log('work3');
          return array.slice(array.length / 2 + 1, array.length)
        } else {
          console.log('work4');
          return array.slice(array.length / 2, array.length)
        }
      }
    }
  }
}
