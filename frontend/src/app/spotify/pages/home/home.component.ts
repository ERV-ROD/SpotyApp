import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from './../../interfaces/spotify-top-tracks';
import { of, switchMap } from 'rxjs';
import { CardListComponent } from "../../components/card-list/card-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CardListComponent]
})
export class HomeComponent {
  constructor(private spotifyService: SpotifyService) {}
  newReleases: any[] = [];
  token!: any;

  ngOnInit(): void {
    this.getAccessTokenAndFetchReleases();
  }

  /**
   * The function `getAccessTokenAndFetchReleases` retrieves an access token from the Spotify service
   * and then fetches new releases using that token.
   */
  private getAccessTokenAndFetchReleases(): void {
    this.spotifyService.getAccessToken().subscribe(
      token => {
        this.spotifyService.setToken(token?.access_token);
        this.token = token?.access_token;
        this.fetchNewReleases();
      }
    )
  }

  /**
   * The function fetches new releases from the Spotify service and adds them to the newReleases array.
   */
  private fetchNewReleases(): void {
    this.spotifyService.getNewReleases(this.token).subscribe(
      newReleases => {
        console.log(newReleases);
        newReleases?.albums.items.forEach((item: any) => {
          this.newReleases.push(item);
        });
      },
    );
  }
}
