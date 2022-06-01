import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameQueryObject } from '../shared/gameQueryObject.model';
import { Game } from './shared/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) {}

  getGames(queryObject: GameQueryObject) {
    let queryParams = new HttpParams();

    for (const key in queryObject) {
      if (queryObject.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, queryObject[key]);
      }
    }
    return this.http
      .get<{ games: Game[]}>(`${environment.igdbProxyUrl}/games`, { params: queryParams })
      .pipe(take(1));
  }

  getGame(gameId: number, fields: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('fields', fields);
    return this.http
      .get<{ game: Game}>(`${environment.igdbProxyUrl}/games/${gameId}`, {
        params: queryParams,
      })
      .pipe(take(1));
  }

  getCoverUrl(imageId: string): string {
    return `${environment.igdbImageUrl}/t_cover_big/${imageId}.jpg`;
  }

  getScreenshotUrl(imageId: string): string {
    return `${environment.igdbImageUrl}/t_screenshot_huge/${imageId}.jpg`;
  }
}
