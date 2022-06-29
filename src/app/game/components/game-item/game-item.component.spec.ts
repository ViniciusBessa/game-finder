import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { GameItemComponent } from './game-item.component';

describe('GameItemComponent', () => {
  describe('GameItemComponent with no rating and no cover', () => {
    let component: GameItemComponent;
    let fixture: ComponentFixture<GameItemComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [GameItemComponent],
        imports: [HttpClientModule, RouterTestingModule, SharedModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GameItemComponent);
      component = fixture.componentInstance;
      component.game = {
        id: 2000,
        name: 'Test',
        summary: 'Test',
        genres: [
          { id: 1, name: 'adventure' },
          { id: 1, name: 'action' },
        ],
      };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should return the game's genres", () => {
      expect(component.getGameGenres()).toEqual('adventure, action');
    });

    it('a game with no rating should display a hyphen', () => {
      let compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('span')?.textContent).toEqual('-');
    });

    it('a game with no cover should display the placeholder', () => {
      expect(component.gameCoverUrl).toBeFalsy();
    });
  });

  describe('GameItemComponent with rating and cover', () => {
    let component: GameItemComponent;
    let fixture: ComponentFixture<GameItemComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [GameItemComponent],
        imports: [HttpClientModule, RouterTestingModule, SharedModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(GameItemComponent);
      component = fixture.componentInstance;
      component.game = {
        id: 2000,
        name: 'Test',
        summary: 'Test',
        genres: [
          { id: 1, name: 'adventure' },
          { id: 1, name: 'action' },
        ],
        rating: 100,
        cover: { id: 1, image_id: 'test' },
      };
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should return the game's genres", () => {
      expect(component.getGameGenres()).toEqual('adventure, action');
    });

    it('a game with a rating should display it', () => {
      let compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('span')?.textContent).toEqual('100');
    });

    it('a game with a cover should display it', () => {
      expect(component.gameCoverUrl).toBeTruthy();
    });
  });
});
