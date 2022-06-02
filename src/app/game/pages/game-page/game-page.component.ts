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

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.gameService
        .getGame(
          params['gameId'],
          '*, cover.*, similar_games.*, similar_games.cover.*, screenshots.*'
        )
        .subscribe((game: Game) => {
          this.game = game;
          this.getGameScreenshots();
          if (this.game.cover && this.game.cover.image_id) {
            this.gameCover = this.gameService.getCoverUrl(
              this.game.cover.image_id
            );
          }
        });
    });
  }

  getGameScreenshots(): void {
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
}
