import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameQueryObject } from '../models/gameQueryObject.model';
import { Game } from './models/game.model';
import { Genre } from './models/genre.model';
import { Platform } from './models/platform.model';

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
      .get<{ games: Game[] }>(`${environment.igdbProxyUrl}/games`, {
        params: queryParams,
      })
      .pipe(
        take(1),
        map((response) => response.games)
      );
  }

  getGame(gameId: number, fields: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('fields', fields);
    return this.http
      .get<{ game: Game }>(`${environment.igdbProxyUrl}/games/${gameId}`, {
        params: queryParams,
      })
      .pipe(
        take(1),
        map((response) => response.game)
      );
  }

  getGameCount(queryObject: GameQueryObject) {
    let queryParams = new HttpParams();

    for (const key in queryObject) {
      if (queryObject.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, queryObject[key]);
      }
    }
    return this.http
      .get<{ count: number }>(`${environment.igdbProxyUrl}/games/count`, {
        params: queryParams,
      })
      .pipe(
        take(1),
        map((response) => response.count)
      );
  }

  getGenres(queryObject: GameQueryObject) {
    let queryParams = new HttpParams();

    for (const key in queryObject) {
      if (queryObject.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, queryObject[key]);
      }
    }
    return this.http
      .get<{ genres: Genre[] }>(`${environment.igdbProxyUrl}/genres`, {
        params: queryParams,
      })
      .pipe(
        take(1),
        map((response) => {
          const genres = response.genres;
          return genres;
        })
      );
  }

  getPlatforms(queryObject: GameQueryObject) {
    let queryParams = new HttpParams();

    for (const key in queryObject) {
      if (queryObject.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, queryObject[key]);
      }
    }
    return this.http
      .get<{ platforms: Platform[] }>(`${environment.igdbProxyUrl}/platforms`, {
        params: queryParams,
      })
      .pipe(
        take(1),
        map((response) => {
          const platforms = response.platforms;
          return platforms;
        })
      );
  }

  getCoverUrl(imageId: string): string {
    return `${environment.igdbImageUrl}/t_cover_big/${imageId}.jpg`;
  }

  getScreenshotUrl(imageId: string): string {
    return `${environment.igdbImageUrl}/t_screenshot_huge/${imageId}.jpg`;
  }
}
