import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ImageSliderComponent } from './image-slider.component';

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageSliderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    component.images = ['image1', 'image2', 'image3'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first image by default', () => {
    expect(component.getSelectedImage()).toBe(component.images[0]);
  });

  it('should display the second image when toggled from it', fakeAsync(() => {
    spyOn(component, 'onToggleSlider').and.callThrough();
    let compiled = fixture.debugElement.nativeElement as HTMLElement;
    let secondImage = compiled.querySelectorAll(
      '.container img'
    )[1] as HTMLImageElement;
    secondImage.click();
    tick();
    expect(component.onToggleSlider).toHaveBeenCalled();
    expect(component.getSelectedImage()).toBe(component.images[1]);
  }));

  it('should display the third image from the slider', fakeAsync(() => {
    spyOn(component, 'onToggleSlider').and.callThrough();
    spyOn(component, 'onUpdateSelectedImage').and.callThrough();
    let compiled = fixture.debugElement.nativeElement as HTMLElement;

    // Opening the image slider
    let secondImage = compiled.querySelectorAll(
      '.container img'
    )[1] as HTMLImageElement;
    secondImage.click();
    fixture.detectChanges();

    // Clicking the button that select the next image
    let nextButton = compiled.querySelectorAll(
      '.slider .slider__button'
    )[1] as HTMLButtonElement;
    nextButton.click()
    tick();
    expect(component.onToggleSlider).toHaveBeenCalled();
    expect(component.onUpdateSelectedImage).toHaveBeenCalled();
    expect(component.getSelectedImage()).toBe(component.images[2]);
  }));
});
