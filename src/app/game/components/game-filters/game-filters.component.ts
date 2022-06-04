import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GameService } from '../../game.service';
import { FiltersFormValues } from '../../models/filters-form-values.model';
import { Genre } from '../../models/genre.model';
import { Platform } from '../../models/platform.model';

@Component({
  selector: 'app-game-filters',
  templateUrl: './game-filters.component.html',
  styleUrls: ['./game-filters.component.css'],
})
export class GameFiltersComponent implements OnInit {
  @Output() formValues = new EventEmitter<FiltersFormValues>();
  filtersForm = new FormGroup({
    minRating: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    maxRating: new FormControl(100, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    genres: new FormArray([]),
    platforms: new FormArray([]),
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
      .getPlatforms({ fields: '*', limit: 50 })
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
    const genresArray: FormArray = <FormArray>this.filtersForm.get('genres');
    genres.forEach((genre) => {
      genresArray.push(
        new FormControl({ id: genre.id, name: genre.name, checked: true })
      );
    });
  }

  get genresFormArray(): AbstractControl[] {
    return (<FormArray>this.filtersForm.get('genres')).controls;
  }

  setPlatformsFormArray(platforms: Platform[]): void {
    const platformsArray: FormArray = <FormArray>(
      this.filtersForm.get('platforms')
    );
    platforms.forEach((platform) => {
      platformsArray.push(
        new FormControl({ id: platform.id, name: platform.name, checked: true })
      );
    });
  }

  get platformsFormArray(): AbstractControl[] {
    return (<FormArray>this.filtersForm.get('platforms')).controls;
  }

  onFiltersToggle(): void {
    this.showForm = !this.showForm;
  }

  onSubmit(): void {
    if (this.filtersForm.valid) {
      this.formValues.emit(this.filtersForm.value);
    }
  }
}
