import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { GameService } from './game.service';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    gameService = TestBed.inject(GameService);
  });

  it('should create', () => {
    expect(gameService).toBeTruthy();
  });

  it('should return the correct cover url', () => {
    expect(gameService.getCoverUrl('test')).toEqual(
      `${environment.igdbImageUrl}/t_cover_big/test.jpg`
    );
  });

  it('should return the correct screenshot url', () => {
    expect(gameService.getScreenshotUrl('test')).toEqual(
      `${environment.igdbImageUrl}/t_screenshot_huge/test.jpg`
    );
  });
});
