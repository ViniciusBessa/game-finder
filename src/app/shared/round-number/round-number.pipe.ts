import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber',
})
export class RoundNumberPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value);
  }
}
