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
  randomGame: Game | undefined;
  gameCoverUrl: string = '';
  filters: string = '';
  isLoading: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  onGetRandomGame(): void {
    const queryObject: GameQueryObject = {
      fields: '*, cover.*, genres.*, platforms.*',
      where: this.filters,
    };
    this.isLoading = true;
    this.gameCoverUrl = '';
    this.gameService.getRandomGame(queryObject).subscribe((game) => {
      this.randomGame = game;
      if (game.cover) {
        this.gameCoverUrl = this.gameService.getCoverUrl(game.cover.image_id);
      }
      this.isLoading = false;
    });
  }

  onClearFilters(): void {
    this.filters = '';
  }

  onFiltersUpdate(filters: string): void {
    if (filters) {
      this.filters = filters;
    }
  }
}
