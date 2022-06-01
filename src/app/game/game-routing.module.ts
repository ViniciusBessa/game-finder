import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './game-page/game-page.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { RandomGameComponent } from './random-game/random-game.component';

const routes: Routes = [
  { path: 'random', component: RandomGameComponent },
  { path: 'search', component: GameSearchComponent },
  { path: ':gameId', component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
