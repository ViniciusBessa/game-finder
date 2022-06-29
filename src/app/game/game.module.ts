import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameItemComponent } from './components/game-item/game-item.component';
import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { RandomGameComponent } from './pages/random-game/random-game.component';
import { GameSearchComponent } from './pages/game-search/game-search.component';
import { SharedModule } from '../shared/shared.module';
import { GameFiltersComponent } from './components/game-filters/game-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameSearchComponent,
    GameItemComponent,
    GamePageComponent,
    RandomGameComponent,
    GameFiltersComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class GameModule {}
