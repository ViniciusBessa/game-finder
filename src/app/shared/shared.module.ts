import { NgModule } from '@angular/core';
import { RoundNumberPipe } from './round-number/round-number.pipe';

@NgModule({
  declarations: [RoundNumberPipe],
  exports: [RoundNumberPipe],
})
export class SharedModule {}
