import { NgModule } from '@angular/core';
import { RoundNumberPipe } from './round-number/round-number.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [RoundNumberPipe, LoadingSpinnerComponent],
  exports: [RoundNumberPipe, LoadingSpinnerComponent],
})
export class SharedModule {}
