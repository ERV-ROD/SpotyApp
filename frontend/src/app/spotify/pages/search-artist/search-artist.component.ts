import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-artist',
  standalone: true,
  imports: [],
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.css'
})
export class SearchArtistComponent {
  albums: any[] = [];
  tracks: any[] = [];
  constructor(private spotifyService:SpotifyService ) {}

  ngOnInit(): void {
    // Esto se debe cambiar claramente no es en el onInit, si no que la idea es que se llame la funcion desde el componente de busqueda
    //this.fetchArtistAlbums('Metallica');
    //this.fetchTracksByArtistName('Metallica');
    //this.fettchTopTracksByArtistId('0TnOYISbd1XYRBk9myaseg');
    //this.fetchAlbumsTracks('4aawyAB9vmqN3uQ7FjRGTy');
  }

  fetchArtistAlbums(artistName: string): void {
    this.spotifyService.searchArtistAlmbumsByName(artistName).subscribe(
      albums => {
        console.log('albums2:', albums);
        albums?.albums.items.forEach((item: any) => {
          this.albums.push(item);
        });
      }
    );
  }

  fetchTracksByArtistName(artistName: string): void {
    this.spotifyService.searchTracksByArtistName(artistName).subscribe(
      tracks => {
        console.log('tracks:', tracks);
        tracks?.tracks.items.forEach((item: any) => {
          this.tracks.push(item);
        });
      }
    );
  }

  fettchTopTracksByArtistId(artistId: string): void {
    this.spotifyService.getTopTracks(artistId).subscribe(
      tracks => {
        console.log('TopTracks:', tracks);
      }
    );
  }

  fetchAlbumsTracks(albumID:string): void {
    this.spotifyService.getAlbumsTracks(albumID).subscribe(
      tracks => {
        console.log('AlbumsTracks:', tracks);
      }
    );
  }


}
