import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService } from '../../game.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  game!: Game;
  gameScreenshots: string[] = [];
  gameCover: string | undefined;
  isLoading: boolean = false;
  responseError: any;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.isLoading = true;
      this.gameService
        .getGame(
          params['gameId'],
          '*, genres.*,platforms.*, cover.*, similar_games.*, similar_games.genres.*, similar_games.cover.*, screenshots.*'
        )
        .subscribe({
          next: (game: Game) => {
            this.game = game;
            this.loadGameScreenshots();
            if (this.game.cover && this.game.cover.image_id) {
              this.gameCover = this.gameService.getCoverUrl(
                this.game.cover.image_id
              );
            }
          },
          error: (error) => {
            this.responseError = error;
            this.isLoading = false;
          },
          complete: () => (this.isLoading = false),
        });
    });
  }

  loadGameScreenshots(): void {
    const screenshots: string[] = [];

    if (!this.game || !this.game.screenshots) return;

    for (const screenshot of this.game.screenshots) {
      if (screenshot.image_id) {
        screenshots.push(
          this.gameService.getScreenshotUrl(screenshot.image_id)
        );
      }
    }
    this.gameScreenshots = screenshots;
  }

  getRatingClasses(rating: number) {
    return {
      'game__rating--high': rating >= 75,
      'game__rating--average': rating >= 50 && rating < 75,
      'game__rating--low': rating < 50,
    };
  }

  getGenres(): string {
    return this.game.genres!.map((genre) => genre.name).join(', ');
  }

  getPlatforms(): string {
    return this.game.platforms!.map((platform) => platform.name).join(', ');
  }
}
