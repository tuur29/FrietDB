import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeProtocol'})
export class RemoveProtocolPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/(^\w+:|^)\/\//, '');
  }
}