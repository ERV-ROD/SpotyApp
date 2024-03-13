import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TracksTableComponent } from "../../components/tracks-table/tracks-table.component";

@Component({
    selector: 'album',
    standalone: true,
    templateUrl: './album.component.html',
    styleUrl: './album.component.css',
    imports: [TracksTableComponent, RouterModule]
})
export class AlbumComponent {
  songs:any[] = [];
  image:string = "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg";
  album:any;
  finish:boolean = false;

  constructor(
    private activetedRoute: ActivatedRoute,
    private router:Router,
    private spotifyService: SpotifyService,
    private location: Location
  ){}

  ngOnInit():void{
    this.activetedRoute.params
      .pipe(
         switchMap(({id})=> this.spotifyService.getAlbumsTracks(id))
      )
      .subscribe(tracks =>{
        if(!tracks) return this.router.navigateByUrl('');
        else{
          this.songs = tracks.items;
          this.setAlbum(this.songs);
          return;
        };
      }
    );
  }

  setAlbum(songs:any){
      this.spotifyService.getTrackById(songs[0].id)
      .subscribe(track =>{
        if(track?.album.images.length != 0){
          for (const song of songs) {
            song.album = track!.album;
          }
          this.album = track!.album;
          this.getImage();
          this.finish = true;
        }
      });
  }

  getImage():void{
    console.log(this.album);
    if(this.album.images.length != 0){
      this.image = this.album.images[0].url;
    }
  }

  goBack():void{
    this.location.back();
  }


}
