import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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
  isLoading: boolean = false;
  responseError: any;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Params) => {
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

  onSubmit() {
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

  onFiltersUpdate(formValues: FiltersFormValues) {
    let selectedGenresIds = this.getFormArrayIds(formValues.genres);
    let selectedPlatformsIds = this.getFormArrayIds(formValues.platforms);
    const queryParams = {
      fields: '*,genres.*,platforms.*,cover.*',
      where: `genres=(${selectedGenresIds})&platforms=(${selectedPlatformsIds})`,
    };
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams,
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
