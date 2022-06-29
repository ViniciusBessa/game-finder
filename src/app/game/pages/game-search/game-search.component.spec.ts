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
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameFiltersComponent } from '../../components/game-filters/game-filters.component';
import { GameItemComponent } from '../../components/game-item/game-item.component';
import { GameService } from '../../game.service';

import { GameSearchComponent } from './game-search.component';

describe('GameSearchComponent', () => {
  let component: GameSearchComponent;
  let fixture: ComponentFixture<GameSearchComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameSearchComponent,
        GameFiltersComponent,
        GameItemComponent,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSearchComponent);
    component = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    spyOn(gameService, 'getGameCount').and.returnValue(
      new Observable((subscriber) => subscriber.next(8))
    );
    spyOn(gameService, 'getGames').and.returnValue(
      new Observable((subscriber) =>
        subscriber.next([
          { id: 1, name: 'Test', summary: 'Test' },
          { id: 2, name: 'Test', summary: 'Test' },
          { id: 3, name: 'Test', summary: 'Test' },
          { id: 4, name: 'Test', summary: 'Test' },
          { id: 5, name: 'Test', summary: 'Test' },
          { id: 6, name: 'Test', summary: 'Test' },
          { id: 7, name: 'Test', summary: 'Test' },
          { id: 8, name: 'Test', summary: 'Test' },
        ])
      )
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and update the results', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onSubmit').and.callThrough();
      const compiled = fixture.nativeElement as HTMLElement;
      component.form.patchValue({ name: 'test' });
      (<HTMLButtonElement>compiled.querySelector('.form__submit-btn')).click();
      tick();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.games.length).toBe(8);
      expect(location.path()).toEqual(
        '/?fields=*,genres.*,platforms.*,cover.*&search=test'
      );
    })
  ));

  it('should update the search filters', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onFiltersUpdate').and.callThrough();
      component.onFiltersUpdate('rating>2');
      tick();
      expect(component.onFiltersUpdate).toHaveBeenCalled();
      expect(component.games.length).toBe(8);
      expect(location.path()).toEqual(
        '/?fields=*,genres.*,platforms.*,cover.*&where=rating%3E2'
      );
    })
  ));

  it('should render the result games', fakeAsync(() => {
    const compiled = fixture.nativeElement as HTMLElement;
    (<HTMLButtonElement>compiled.querySelector('.form__submit-btn')).click();
    tick();
    fixture.detectChanges();
    expect(component.games.length).toBe(8);
    expect(compiled.querySelectorAll('app-game-item').length).toBe(8);
  }));

  it("should navigate to the result's last page with the pagination", fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.nativeElement as HTMLElement;
      component.form.patchValue({ name: 'test' });
      (<HTMLButtonElement>compiled.querySelector('.form__submit-btn')).click();
      tick();
      fixture.detectChanges();
      const paginationAnchor = compiled.querySelectorAll(
        '.page-anchor'
      )[1] as HTMLAnchorElement;
      paginationAnchor.click();
      tick();
      expect(+paginationAnchor.textContent!).toEqual(component.getLastPage());
      expect(location.path()).toEqual(
        '/?fields=*,genres.*,platforms.*,cover.*&search=test&page=2'
      );
    })
  ));

  it('should clear the filters and results', fakeAsync(
    inject([Location], (location: Location) => {
      spyOn(component, 'onFiltersUpdate').and.callThrough();
      spyOn(component, 'onClear').and.callThrough();
      component.onFiltersUpdate('rating>2');
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      (<HTMLButtonElement>compiled.querySelector('.clear-btn')).click();
      tick();
      expect(component.onFiltersUpdate).toHaveBeenCalled();
      expect(component.onClear).toHaveBeenCalled();
      expect(component.games.length).toBe(0);
      expect(location.path()).toEqual('/');
    })
  ));
});
