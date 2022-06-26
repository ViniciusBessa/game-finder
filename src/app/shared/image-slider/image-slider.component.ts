import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent implements OnInit {
  @Input() images!: string[];
  showSlider: boolean = false;
  selectedImage: number = 0;

  constructor() {}

  ngOnInit(): void {}

  onToggleSlider(index: number): void {
    this.selectedImage = index;
    this.showSlider = !this.showSlider;
  }

  getSelectedImage(): string {
    return this.images[this.selectedImage];
  }

  onUpdateSelectedImage(number: number): void {
    let newImageIndex = this.selectedImage + number;
    if (newImageIndex < 0) {
      newImageIndex = this.images.length - Math.abs(newImageIndex);
    } else if (newImageIndex >= this.images.length) {
      newImageIndex -= this.images.length;
    }
    this.selectedImage = newImageIndex;
  }
}
