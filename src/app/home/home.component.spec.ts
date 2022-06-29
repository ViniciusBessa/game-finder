import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { GameService } from '../game/game.service';
import { GameSearchComponent } from '../game/pages/game-search/game-search.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'games/search', component: GameSearchComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    spyOn(gameService, 'getGames').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next([
          {
            id: 1,
            name: 'Test',
            summary: 'Test',
            genres: [{ id: 2, name: 'Test' }],
          },
        ])
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input with class form__input for the game name', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const element = compiled.querySelector('.form__input') as HTMLInputElement;
    expect(element).toBeTruthy();
    expect(element.getAttribute('type')).toEqual('text');
    expect(element.getAttribute('name')).toEqual('name');
  });

  it('should submit the form and navigate to the game search page', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onSubmit').and.callThrough();
      const form = component.gameForm;
      form.get('name')?.setValue('test');
      component.onSubmit();
      tick();
      expect(form.get('name')?.valid).toBeTrue();
      expect(form.valid).toBeTrue();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(location.path()).toEqual(
        '/games/search?fields=*,genres.*,platforms.*,cover.*&search=test'
      );
    })
  ));

  it('should try to submit the form', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onSubmit').and.callThrough();
      const form = component.gameForm;
      component.onSubmit();
      tick();
      expect(form.get('name')?.valid).toBeFalse();
      expect(form.valid).toBeFalse();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(location.path()).toEqual('');
    })
  ));

  it('should mock the gameService and push the values to the games array', () => {
    expect(gameService.getGames).toHaveBeenCalled();
    expect(component.games.length).toBeGreaterThan(0);
  });

  it('should render the game cards and their genres', () => {
    const game = component.games[0];
    const compiled = fixture.nativeElement as HTMLElement;
    const gameCard = compiled.querySelector('.card') as HTMLDivElement;
    expect(gameCard).toBeTruthy();
    expect(gameCard.querySelector('p')?.textContent).toEqual(
      game.genres![0].name
    );
  });

  it('should navigate to the game search page when a game card is clicked', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      const gameCard = compiled.querySelector('.card') as HTMLDivElement;
      gameCard.click();
      tick();
      expect(location.path()).toEqual(
        '/games/search?fields=*,genres.*,platforms.*,cover.*&where=genres%3D(2)'
      );
    })
  ));
});
