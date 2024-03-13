import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { NewRealeses } from '../../interfaces/new-realeases';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
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
        console.log('Token:', this.token);
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
        console.log('New Releases:', newReleases);
        newReleases?.albums.items.forEach((item: any) => {
          this.newReleases.push(item);
        });
      },
    );
  }
}
