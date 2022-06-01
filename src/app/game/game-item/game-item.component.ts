import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../shared/game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css'],
})
export class GameItemComponent implements OnInit {
  @Input() game!: Game;
  gameCoverUrl!: string;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    if (this.game.cover) {
      this.gameCoverUrl = this.gameService.getCoverUrl(
        this.game.cover.image_id as string
      );
    }
  }

  getRatingClasses(rating: number) {
    return {
      'game__rating--high': rating >= 75,
      'game__rating--average': rating >= 50 && rating < 75,
      'game__rating--low': rating < 50,
    };
  }

  onGamePage() {
    window.scrollTo({ top: 0 });
    this.router.navigate(['games', this.game.id]);
  }
}
