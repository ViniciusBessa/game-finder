import { NgModule } from '@angular/core';
import { RoundNumberPipe } from './round-number/round-number.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RoundNumberPipe,
    LoadingSpinnerComponent,
    ImageSliderComponent,
  ],
  exports: [RoundNumberPipe, LoadingSpinnerComponent, ImageSliderComponent],
})
export class SharedModule {}
