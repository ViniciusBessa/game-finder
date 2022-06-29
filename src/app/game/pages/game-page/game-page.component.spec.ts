import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { Error404Component } from 'src/app/error404/error404.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameItemComponent } from '../../components/game-item/game-item.component';
import { GameService } from '../../game.service';

import { GamePageComponent } from './game-page.component';

describe('GamePageComponent', () => {
  describe('Game with no ratings, screenshots or similar games', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;
    let gameService: GameService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [GamePageComponent, GameItemComponent],
        imports: [HttpClientModule, RouterTestingModule, SharedModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GamePageComponent);
      component = fixture.componentInstance;
      gameService = fixture.debugElement.injector.get(GameService);
      spyOn(gameService, 'getGame').and.returnValue(
        new Observable((subscriber) =>
          subscriber.next({
            id: 1,
            name: 'Test',
            summary: 'Test',
            genres: [
              { id: 1, name: 'Action' },
              { id: 2, name: 'Adventure' },
            ],
            platforms: [
              {
                id: 1,
                name: 'Playstation 2',
              },
              {
                id: 2,
                name: 'Xbox 360',
              },
            ],
          })
        )
      );
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should render the game's name, ratings, summary, genres and platforms", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain(
        component.game.name
      );
      expect(
        compiled.querySelectorAll('.game__rating')[0]?.textContent
      ).toEqual('-');
      expect(
        compiled.querySelectorAll('.game__rating')[1]?.textContent
      ).toEqual('-');
      expect(
        compiled.querySelectorAll('.game__details p')[0].textContent
      ).toEqual(component.game.summary);
      expect(
        compiled.querySelectorAll('.game__details p')[1].textContent
      ).toContain(component.getGenres());
      expect(
        compiled.querySelectorAll('.game__details p')[2].textContent
      ).toContain(component.getPlatforms());
    });

    it("should return the game's genres in a string", () => {
      expect(component.getGenres()).toEqual('Action, Adventure');
    });

    it("should return the game's platforms in a string", () => {
      expect(component.getPlatforms()).toEqual('Playstation 2, Xbox 360');
    });
  });

  describe('Game with ratings, screenshots and similar games', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;
    let gameService: GameService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [GamePageComponent, GameItemComponent],
        imports: [HttpClientModule, RouterTestingModule, SharedModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GamePageComponent);
      component = fixture.componentInstance;
      gameService = fixture.debugElement.injector.get(GameService);
      spyOn(gameService, 'getGame').and.returnValue(
        new Observable((subscriber) =>
          subscriber.next({
            id: 1,
            name: 'Test',
            summary: 'Test',
            rating: 80,
            aggregated_rating: 75,
            screenshots: [
              { id: 22, image_id: 'test' },
              { id: 23, image_id: 'test' },
            ],
            similar_games: [
              { id: 2, name: 'Test', summary: 'Test' },
              { id: 3, name: 'Test', summary: 'Test' },
            ],
            genres: [
              { id: 1, name: 'Action' },
              { id: 2, name: 'Adventure' },
            ],
            platforms: [
              {
                id: 1,
                name: 'Playstation 2',
              },
              {
                id: 2,
                name: 'Xbox 360',
              },
            ],
          })
        )
      );
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should render the game's name, ratings, summary, genres and platforms", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain(
        component.game.name
      );
      expect(
        compiled.querySelectorAll('.game__rating')[0]?.textContent
      ).toEqual('80');
      expect(
        compiled.querySelectorAll('.game__rating')[1]?.textContent
      ).toEqual('75');
      expect(
        compiled.querySelectorAll('.game__details p')[0].textContent
      ).toEqual(component.game.summary);
      expect(
        compiled.querySelectorAll('.game__details p')[1].textContent
      ).toContain(component.getGenres());
      expect(
        compiled.querySelectorAll('.game__details p')[2].textContent
      ).toContain(component.getPlatforms());
    });

    it("should render the game's screenshots and similar games", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelectorAll('app-image-slider').length).toEqual(1);
      expect(compiled.querySelectorAll('section h1')[1].textContent).toEqual(
        'Screenshots'
      );
      expect(compiled.querySelectorAll('app-game-item').length).toEqual(2);
      expect(compiled.querySelectorAll('section h1')[2].textContent).toEqual(
        'Jogos similares'
      );
    });

    it("should return the game's genres in a string", () => {
      expect(component.getGenres()).toEqual('Action, Adventure');
    });

    it("should return the game's platforms in a string", () => {
      expect(component.getPlatforms()).toEqual('Playstation 2, Xbox 360');
    });
  });

  describe('No game found with the provided id', () => {
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;
    let gameService: GameService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [GamePageComponent, GameItemComponent],
        imports: [
          HttpClientModule,
          SharedModule,
          RouterTestingModule.withRoutes([
            { path: '**', component: Error404Component },
          ]),
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GamePageComponent);
      component = fixture.componentInstance;
      gameService = fixture.debugElement.injector.get(GameService);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should redirect to the error 404 page', fakeAsync(
      inject([Location], (location: Location) => {
        spyOn(gameService, 'getGame').and.returnValue(
          new Observable((subscriber) => subscriber.error())
        );
        fixture.detectChanges();
        tick();
        expect(location.path()).toEqual('/404');
      })
    ));
  });
});
