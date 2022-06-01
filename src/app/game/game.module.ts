import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameItemComponent } from './game-item/game-item.component';
import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './game-page/game-page.component';
import { RandomGameComponent } from './random-game/random-game.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GameSearchComponent,
    GameItemComponent,
    GamePageComponent,
    RandomGameComponent,
  ],
  imports: [CommonModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
