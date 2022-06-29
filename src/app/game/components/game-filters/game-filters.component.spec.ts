import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { UntypedFormArray, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { GameService } from '../../game.service';

import { GameFiltersComponent } from './game-filters.component';

describe('GameFiltersComponent', () => {
  let component: GameFiltersComponent;
  let fixture: ComponentFixture<GameFiltersComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameFiltersComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFiltersComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    spyOn(gameService, 'getGenres').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next([
          { id: 1, name: 'Test' },
          { id: 2, name: 'Test' },
        ])
      )
    );
    spyOn(gameService, 'getPlatforms').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next([
          { id: 12, name: 'Test' },
          { id: 27, name: 'Test' },
        ])
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the filters form', () => {
    spyOn(component, 'onFiltersToggle').and.callThrough();
    let compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.click();
    fixture.detectChanges();
    expect(component.onFiltersToggle).toHaveBeenCalled();
  });

  it('should always keep the maxRating greater than or equal to minRating', () => {
    const filtersForm = component.filtersForm;
    filtersForm.patchValue({ minRating: 10, maxRating: 5 });
    const minRating = <UntypedFormControl>filtersForm.get('minRating');
    const maxRating = <UntypedFormControl>filtersForm.get('maxRating');
    expect(maxRating.value).toBeGreaterThanOrEqual(minRating.value);
  });

  it('should fail to submit the form', () => {
    spyOn(component.filters, 'emit');
    spyOn(component, 'onFiltersToggle');
    const filtersForm = component.filtersForm;
    filtersForm.patchValue({ minRating: -10, maxRating: -10 });
    const minRating = <UntypedFormControl>filtersForm.get('minRating');
    const maxRating = <UntypedFormControl>filtersForm.get('maxRating');
    expect(minRating.valid).toBeFalse();
    expect(maxRating.valid).toBeFalse();
    expect(filtersForm.valid).toBeFalse();
    expect(component.filters.emit).not.toHaveBeenCalled();
    expect(component.onFiltersToggle).not.toHaveBeenCalled();
  });

  it('should submit successfully the form', () => {
    spyOn(component.filters, 'emit');
    spyOn(component, 'onFiltersToggle');
    const filtersForm = component.filtersForm;
    filtersForm.patchValue({ minRating: 20, maxRating: 30 });
    component.onSubmit();
    expect(filtersForm.valid).toBeTrue();
    expect(component.filters.emit).toHaveBeenCalled();
    expect(component.onFiltersToggle).toHaveBeenCalled();
  });

  it('should return the formArray in a string', () => {
    const formArray = [
      { id: 1, name: 'Test 1', checked: true },
      { id: 2, name: 'Test 2', checked: false },
      { id: 3, name: 'Test 3', checked: true },
    ];
    expect(component.getFormArrayIds(formArray)).toEqual('1,3');
  });

  it('should reset the genres formArray', () => {
    spyOn(component, 'onClearFormsArray').and.callThrough();
    let compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.click();
    fixture.detectChanges();
    const clearBtn = compiled.querySelector(
      '.form__clear-btn'
    ) as HTMLButtonElement;
    clearBtn.click();
    const genresArray = <UntypedFormArray>component.filtersForm.get('genres');
    const isArrayClear = genresArray.controls.every(
      (control) => !control.value.checked
    );
    expect(component.onClearFormsArray).toHaveBeenCalled();
    expect(isArrayClear).toBeTrue();
  });
});
