import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, take, tap, throwError } from 'rxjs';
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

  getRandomGame(queryObject: GameQueryObject) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('where', queryObject.where || '');
    queryParams = queryParams.append('fields', queryObject.fields);
    return this.http
      .get<{ count: number }>(`${environment.igdbProxyUrl}/games/count`, {
        params: queryParams,
      })
      .pipe(
        take(1),
        mergeMap((response) => {
          const randomGameNumber: number = Math.floor(
            Math.random() * response.count
          );
          queryParams = queryParams.append('limit', 1);
          queryParams = queryParams.append('offset', randomGameNumber);
          return this.http.get<{ games: Game[] }>(
            `${environment.igdbProxyUrl}/games`,
            { params: queryParams }
          );
        }),
        map((response) => {
          if (response.games.length === 0) {
            throw new Error('Nenhum jogo foi encontrado');
          }
          return response.games[0];
        })
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
