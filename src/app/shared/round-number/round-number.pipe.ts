import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber',
})
export class RoundNumberPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number {
    return Math.round(value);
  }
}
