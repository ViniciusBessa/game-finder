import { Component, OnInit } from '@angular/core';
import { GameQueryObject } from 'src/app/models/gameQueryObject.model';
import { GameService } from '../../game.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-random-game',
  templateUrl: './random-game.component.html',
  styleUrls: ['./random-game.component.css'],
})
export class RandomGameComponent implements OnInit {
  randomGame: Game | null = null;
  gameCoverUrl: string = '';
  filters: string = '';
  isLoading: boolean = false;
  message: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  onGetRandomGame(): void {
    const queryObject: GameQueryObject = {
      fields: '*, cover.*, genres.*, platforms.*',
      where: this.filters,
    };
    this.randomGame = null;
    this.isLoading = true;
    this.message = '';
    this.gameCoverUrl = '';
    this.gameService.getRandomGame(queryObject).subscribe({
      next: (game) => {
        this.randomGame = game;
        if (game.cover) {
          this.gameCoverUrl = this.gameService.getCoverUrl(game.cover.image_id);
        }
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.isLoading = false;
        this.message = error.message;
      },
    });
  }

  onClearFilters(): void {
    if (this.filters) {
      this.filters = '';
      this.message = 'Os filtros foram retirados';
    }
  }

  onClearAlert(): void {
    this.message = '';
  }

  onFiltersUpdate(filters: string): void {
    if (filters) {
      this.filters = filters;
      this.message = 'Os filtros foram aplicados';
    }
  }
}
