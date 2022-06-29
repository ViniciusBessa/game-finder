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
import { SharedModule } from 'src/app/shared/shared.module';
import { GameFiltersComponent } from '../../components/game-filters/game-filters.component';
import { GameService } from '../../game.service';
import { GamePageComponent } from '../game-page/game-page.component';

import { RandomGameComponent } from './random-game.component';

describe('RandomGameComponent', () => {
  let component: RandomGameComponent;
  let fixture: ComponentFixture<RandomGameComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomGameComponent, GameFiltersComponent],
      imports: [
        HttpClientModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'games/:gameId', component: GamePageComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomGameComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    spyOn(gameService, 'getRandomGame').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next({ id: 1, name: 'Test', summary: 'Test' })
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the filters property when the method onFiltersUpdate is called', () => {
    component.onFiltersUpdate('test');
    expect(component.filters).toEqual('test');
  });

  it('should clear the filters property when the clear button is clicked', () => {
    component.filters = 'test';
    spyOn(component, 'onClearFilters').and.callThrough();
    const compiled = fixture.nativeElement as HTMLElement;
    (<HTMLButtonElement>compiled.querySelector('.clear-btn')).click();
    expect(component.onClearFilters).toHaveBeenCalled();
    expect(component.filters).toEqual('');
  });

  it('should fetch a new random game when the submit button is clicked', () => {
    spyOn(component, 'onGetRandomGame').and.callThrough();
    const compiled = fixture.nativeElement as HTMLElement;
    (<HTMLButtonElement>compiled.querySelector('.submit-btn')).click();
    fixture.detectChanges();
    expect(component.onGetRandomGame).toHaveBeenCalled();
    expect(gameService.getRandomGame).toHaveBeenCalled();
    expect(component.randomGame).toBeTruthy();
    expect(compiled.querySelector('div div h1')?.textContent).toContain(
      component.randomGame!.name
    );
  });

  it('should navigate to the game page when the link is clicked', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onGetRandomGame').and.callThrough();
      const compiled = fixture.nativeElement as HTMLElement;
      (<HTMLButtonElement>compiled.querySelector('.submit-btn')).click();
      fixture.detectChanges();
      compiled.querySelectorAll('a')[1].click();
      tick();
      expect(component.onGetRandomGame).toHaveBeenCalled();
      expect(gameService.getRandomGame).toHaveBeenCalled();
      expect(component.randomGame).toBeTruthy();
      expect(location.path()).toEqual('/games/1');
    })
  ));
});
