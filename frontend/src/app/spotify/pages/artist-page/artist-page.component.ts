import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { TracksTableComponent } from '../../components/tracks-table/tracks-table.component';
import { Artist } from '../../interfaces/spotify-artist';

@Component({
  selector: 'artist-page',
  standalone: true,
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css',
  imports: [TracksTableComponent],
})
export class ArtistPageComponent {
  constructor(
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService,
    private location: Location
  ) {}

  public songs: any[] = [];
  public artist: any ;
  public finish = false;

  ngOnInit() {
    this.activetedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.getAlbum(id);
          return this.spotifyService.getTopTracks(id);
        })
      )
      .subscribe((tracks) => {
        if (!tracks) return this.router.navigateByUrl('');
        else {
          this.songs = tracks.tracks;
          this.finish = true;
          return;
        }
      });
  }

  getAlbum(id:string):void{
    this.spotifyService.getArtistById(id).subscribe((artist)=>{
      this.artist = artist;
    })
  }

  goBack(): void {
    this.location.back();
  }
}
