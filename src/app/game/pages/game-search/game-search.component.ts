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
  gameCount: number = 0;
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

        // Getting the number of games that fits the queryParams
        this.gameService
          .getGameCount(queryParams as GameQueryObject)
          .subscribe({ next: (count) => (this.gameCount = count) });

        // Getting five games that fit the queryParams
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
        page: null,
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
    const minRating = formValues.minRating;
    const maxRating = formValues.maxRating;
    whereQueryParam.push(`rating>=${minRating}&rating<=${maxRating}`);

    const queryParams = {
      fields: '*,genres.*,platforms.*,cover.*',
      where: whereQueryParam.join('&'),
      page: null,
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

  getLastPage(): number {
    return Math.ceil(this.gameCount / 5);
  }
}
