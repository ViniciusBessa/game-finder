import { NgModule } from '@angular/core';
import { RoundNumberPipe } from './round-number/round-number.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RoundNumberPipe,
    LoadingSpinnerComponent,
    ImageSliderComponent,
    AlertComponent,
  ],
  exports: [
    RoundNumberPipe,
    LoadingSpinnerComponent,
    ImageSliderComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
