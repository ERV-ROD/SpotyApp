import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify.interfaces';
import { NewRealeses } from '../interfaces/new-realeases';
import { SpotifyArtist } from '../interfaces/spotify-artist';
import { SpotifyTracks } from '../interfaces/spotify-tracks';
import { SpotifyTopTracks } from '../interfaces/spotify-top-tracks';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private clientId: string = '11871aa11abd45d5b8b1a1678fdc9598';
  private clientSecret: string = '6fa9399802604bb9a8c121a8956393f9';
  tokenUrl: string = 'https://accounts.spotify.com/api/token';
  private nweReleasesUrl: string = 'https://api.spotify.com/v1/browse/new-releases';
  private searchItemUrl: string = 'https://api.spotify.com/v1/search';
  private apiUrl = 'https://api.spotify.com/v1';
  idAndSecret: string = btoa(this.clientId + ':' + this.clientSecret);
  private token: string = '';
  http: any;
  private headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.token,
  });

  constructor(private httpClient: HttpClient) {}

  body = 'grant_type=client_credentials';

  options = {
    headers: new HttpHeaders({
      Authorization: 'Basic '.concat(this.idAndSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  getAccessToken_(): string {
    const url = this.tokenUrl;
    this.httpClient
      .post<SpotiToken>(url, this.body, this.options)
      .pipe(
        map((response) => response.access_token),
        catchError(() => of(''))
      )
      .subscribe((token) => {
        this.token = token;
      });

    return this.token;
  }

  getAccessToken(): Observable<SpotiToken | null> {
    const url = this.tokenUrl;
    return this.httpClient
      .post<SpotiToken>(url, this.body, this.options)
      .pipe(catchError(() => of(null)));
  }

  getNewReleases(entryToken: string): Observable<NewRealeses | null> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + entryToken,
    });
    console.log(this.token);

    return this.httpClient
      .get<NewRealeses>(this.nweReleasesUrl, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error', error);
          return of(null);
        })
      );
  }

  searchTracksByArtistName(artistName: string): Observable<SpotifyTracks | null> {
    const params = new HttpParams().set('q', artistName).set('type', 'track');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.httpClient
      .get<SpotifyTracks>(this.searchItemUrl, { headers, params })
      .pipe(
        catchError((error: any) => {
          console.error('Error', error);
          return of(null);
        })
      );
  }

  searchArtistAlmbumsByName(artistName: string): Observable<SpotifyArtist | null> {
    const params = new HttpParams().set('q', artistName).set('type', 'album');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.httpClient
      .get<SpotifyArtist>(this.searchItemUrl, { headers, params })
      .pipe(
        catchError((error: any) => {
          console.error('Error', error);
          return of(null);
        })
      );
  }

  getTopTracks(artistId: string): Observable<SpotifyTopTracks> {
    const url = `${this.apiUrl}/artists/${artistId}/top-tracks?market=ES`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.httpClient
    .get<SpotifyTopTracks>(url, {headers});
  }

  getAlbumsTracks(albumID:string){
    const url = `${this.apiUrl}/albums/${albumID}/tracks`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.httpClient
    .get<SpotifyTopTracks>(url, {headers});
  }

  setToken(token: any) {
    this.token = token;
  }
}
