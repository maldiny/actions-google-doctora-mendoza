import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ceil'})
export class CeilPipe implements PipeTransform {
  transform (input: number) {
    return Math.ceil(input);
  }
}
