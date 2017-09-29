import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsGreaterThan',
  pure: false
})
export class GreaterThanPipe implements PipeTransform {

  transform(items: any[], prop: string, filterBy: number): any {
    return items.filter(item => item[prop] > filterBy);
  }

}

@Pipe({
  name: 'itemsLessThan',
  pure: false
})
export class LessThanPipe implements PipeTransform {

  transform(items: any[], prop: string, filterBy: number): any {
    return items.filter(item => item[prop] < filterBy);
  }

}
