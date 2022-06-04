import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameQueryObject } from 'src/app/models/gameQueryObject.model';
import { GameService } from '../../game.service';
import { FiltersFormValues } from '../../models/filters-form-values.model';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css'],
})
export class GameSearchComponent implements OnInit {
  @ViewChild('form') nameForm!: NgForm;
  games: Game[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  responseError: any;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.currentPage = +queryParams['page'] || 1;
      if (Object.values(queryParams).length > 0) {
        this.isLoading = true;
        this.gameService.getGames(queryParams as GameQueryObject).subscribe({
          next: (games) => (this.games = games),
          error: (error) => {
            this.responseError = error;
            this.isLoading = false;
          },
          complete: () => (this.isLoading = false),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.nameForm.valid) {
      const queryParams = {
        fields: '*,genres.*,platforms.*,cover.*',
        search: this.nameForm.value.name,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  onFiltersUpdate(formValues: FiltersFormValues): void {
    const selectedGenresIds: string = this.getFormArrayIds(formValues.genres);
    const selectedPlatformsIds: string = this.getFormArrayIds(
      formValues.platforms
    );
    const minRating = formValues.minRating;
    const maxRating = formValues.maxRating;
    const rating: string = `rating>=${minRating}&rating<=${maxRating}`;

    const queryParams = {
      fields: '*,genres.*,platforms.*,cover.*',
      where: `genres=(${selectedGenresIds})&platforms=(${selectedPlatformsIds})&${rating}`,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  onClear(): void {
    this.games = [];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { fields: null, search: null, where: null, page: null },
      queryParamsHandling: 'merge',
    });
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
}