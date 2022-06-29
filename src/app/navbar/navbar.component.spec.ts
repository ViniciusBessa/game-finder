import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameSearchComponent } from '../game/pages/game-search/game-search.component';
import { RandomGameComponent } from '../game/pages/random-game/random-game.component';
import { HomeComponent } from '../home/home.component';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
          { path: 'games/search', component: GameSearchComponent },
          { path: 'games/random', component: RandomGameComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the home page', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.debugElement.nativeElement as HTMLElement;
      (<HTMLAnchorElement>compiled.querySelectorAll('.nav__link')[0]).click();
      tick();
      expect(location.path()).toEqual('/home');
    })
  ));

  it('should navigate to the game search page', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.debugElement.nativeElement as HTMLElement;
      (<HTMLAnchorElement>compiled.querySelectorAll('.nav__link')[1]).click();
      tick();
      expect(location.path()).toEqual('/games/search');
    })
  ));

  it('should navigate to the random game page', fakeAsync(
    inject([Location], (location: Location) => {
      const compiled = fixture.debugElement.nativeElement as HTMLElement;
      (<HTMLAnchorElement>compiled.querySelectorAll('.nav__link')[2]).click();
      tick();
      expect(location.path()).toEqual('/games/random');
    })
  ));

  it('should have the navbar hidden in the mobile by default', () => {
    const navContainer = component.navContainer.nativeElement as HTMLElement;
    expect(navContainer.classList.contains('collapsed')).toBeTrue();
  });

  it('should toggle the navbar in mobile', () => {
    spyOn(component, 'onNavbarToggle').and.callThrough();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      '.navbar__toggle'
    ) as HTMLButtonElement;
    button.click();
    const navContainer = component.navContainer.nativeElement as HTMLElement;
    expect(component.onNavbarToggle).toHaveBeenCalled();
    expect(navContainer.classList.contains('collapsed')).toBeFalse();
  });
});
