import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameQueryObject } from 'src/app/models/gameQueryObject.model';
import { GameService } from '../../game.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css'],
})
export class GameSearchComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(''),
  });
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
      // Scrolling the user's page to the top
      window.scrollTo({ top: 0 });

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
    if (this.form.valid) {
      const queryParams = {
        fields: '*,genres.*,platforms.*,cover.*',
        search: (<string>this.form.value.name).trim(),
        page: null,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  onFiltersUpdate(filters: string): void {
    const queryParams = {
      fields: '*,genres.*,platforms.*,cover.*',
      where: filters,
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

  getLastPage(): number {
    return Math.ceil(this.gameCount / 5);
  }
}
