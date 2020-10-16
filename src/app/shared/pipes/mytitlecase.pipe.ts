import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mytitlecase'
})
export class MytitlecasePipe implements PipeTransform {

  transform(val: string): string {
    if (!val) {
      return val
    } else {
      return val[0].toUpperCase() + val.substr(1).toLowerCase();
    };
  }

}
