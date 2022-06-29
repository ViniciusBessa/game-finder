import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game/game.service';
import { Game } from '../game/models/game.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gameForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });
  games: Game[] = [];
  mainGenresGames: string[] = [
    "assassin's creed: brotherhood",
    'guilty gear',
    'god of war',
    'mario odyssey',
    'need for speed heat',
    'skyrim',
    'red dead redemption',
    'animal crossing: new leaf',
  ];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.mainGenresGames.forEach((gameName) => {
      this.gameService
        .getGames({
          fields: '*,genres.*,cover.*',
          search: gameName,
          limit: 1,
        })
        .subscribe((games) => {
          this.games.push(games[0]);
          // Sorting the games array by the genre's name
          this.games.sort((a: Game, b: Game) => {
            if (a.genres![0].name < b.genres![0].name) {
              return -1;
            } else if (a.genres![0].name > b.genres![0].name) {
              return 1;
            }
            return 0;
          });
        });
    });
  }

  getCover(index: number): string | void {
    const game = this.games[index];
    if (game.cover) {
      return this.gameService.getCoverUrl(game.cover.image_id!);
    }
  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      this.router.navigate(['games', 'search'], {
        queryParams: {
          fields: '*,genres.*,platforms.*,cover.*',
          search: (<string>this.gameForm.value.name).trim(),
        },
      });
    }
  }
}
