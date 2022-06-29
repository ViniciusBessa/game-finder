import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GameService } from '../../game.service';
import { Genre } from '../../models/genre.model';
import { Platform } from '../../models/platform.model';

@Component({
  selector: 'app-game-filters',
  templateUrl: './game-filters.component.html',
  styleUrls: ['./game-filters.component.css'],
})
export class GameFiltersComponent implements OnInit {
  @Output() filters = new EventEmitter<string>();
  filtersForm = new UntypedFormGroup({
    minRating: new UntypedFormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    maxRating: new UntypedFormControl(100, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    genres: new UntypedFormArray([]),
    platforms: new UntypedFormArray([]),
  });
  showForm: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // Getting all genres from the API
    this.gameService
      .getGenres({ fields: '*', limit: 500 })
      .subscribe((genres) => this.setGenresFormArray(genres));

    // Getting all platforms from the API
    this.gameService
      .getPlatforms({ fields: '*', limit: 500 })
      .subscribe((platforms) => this.setPlatformsFormArray(platforms));

    // Observing any value changes in the form
    this.filtersForm.valueChanges.subscribe(() => {
      // Ensuring that the maxRating is always higher or equal to the minRating
      if (this.filtersForm.value.minRating > this.filtersForm.value.maxRating) {
        this.filtersForm.patchValue({
          maxRating: this.filtersForm.value.minRating,
        });
      }
    });
  }

  setGenresFormArray(genres: Genre[]): void {
    const genresArray: UntypedFormArray = <UntypedFormArray>this.filtersForm.get('genres');
    genres.forEach((genre) => {
      genresArray.push(
        new UntypedFormControl({ id: genre.id, name: genre.name, checked: true })
      );
    });
  }

  get genresFormArray(): AbstractControl[] {
    return (<UntypedFormArray>this.filtersForm.get('genres')).controls;
  }

  setPlatformsFormArray(platforms: Platform[]): void {
    const platformsArray: UntypedFormArray = <UntypedFormArray>(
      this.filtersForm.get('platforms')
    );
    platforms.forEach((platform) => {
      platformsArray.push(
        new UntypedFormControl({ id: platform.id, name: platform.name, checked: true })
      );
    });
  }

  get platformsFormArray(): AbstractControl[] {
    return (<UntypedFormArray>this.filtersForm.get('platforms')).controls;
  }

  onFiltersToggle(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.filtersForm.valid) {
      const selectedGenresIds: string = this.getFormArrayIds(
        this.filtersForm.value.genres
      );
      const selectedPlatformsIds: string = this.getFormArrayIds(
        this.filtersForm.value.platforms
      );
      const whereQueryParam: string[] = [];

      // If at least one genre is selected, it is added to the whereQueryParam
      if (selectedGenresIds) {
        whereQueryParam.push(`genres=(${selectedGenresIds})`);
      }
      // If at least one platform is selected, it is added to the whereQueryParam
      if (selectedPlatformsIds) {
        whereQueryParam.push(`platforms=(${selectedPlatformsIds})`);
      }
      // Adding the rating range to the where
      const minRating = this.filtersForm.value.minRating;
      const maxRating = this.filtersForm.value.maxRating;
      whereQueryParam.push(`rating>=${minRating}&rating<=${maxRating}`);

      // Emitting the result filters string
      this.filters.emit(whereQueryParam.join('&'));
      // Closing the filters window
      this.onFiltersToggle();
    }
  }

  getFormArrayIds(
    formArray: {
      id: number;
      name: string;
      checked: boolean;
    }[]
  ): string {
    return formArray
      .filter((formControl) => formControl.checked)
      .map((formControl) => formControl.id)
      .join(',');
  }

  onClearFormsArray(formsArrayName: string): void {
    const formsArray: UntypedFormArray | undefined = <UntypedFormArray>(
      this.filtersForm.get(formsArrayName)
    );
    if (formsArray) {
      // Setting all controls in the formsArray to false
      formsArray.controls.forEach((control) => (control.value.checked = false));
    }
  }
}
