import { SpotifyService } from './../../services/spotify.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { CardComponent } from "../../components/card/card.component";
import { CardListComponent } from "../../components/card-list/card-list.component";
import { CommonModule } from '@angular/common';
import { Album, Tracks } from '../../interfaces/spotify-tracks';

@Component({
    selector: 'app-search-artist',
    standalone: true,
    templateUrl: './search-artist.component.html',
    styleUrl: './search-artist.component.css',
    imports: [SearchComponent, CardComponent, CardListComponent, CommonModule]
})
export class SearchArtistComponent {
  albums: Album[] = [];
  tracks: Tracks[] = [];
  type: string = "artist";
  history: string[] = [];

  @ViewChild('select')
  public select!: ElementRef<HTMLInputElement>;


  constructor(private spotifyService:SpotifyService ) {}

  async ngOnInit() {
    await this.updateHistory();
    if(this.history.length != 0 && this.getType(this.history[0]) =="artist"){
      this.fetchArtistAlbums(this.getName(this.history[0]));
    }else if(this.history.length != 0 && this.getType(this.history[0]) =="track"){
      this.fetchTracksByArtistName(this.getName(this.history[0]));
    }
  }

  async updateHistory(){
    this.history = this.spotifyService.getHistory();
  }

  getName(entry:string):string{
    return entry.split(",")[0];
  }

  getType(entry:string):string{
    return entry.split(",")[1];
  }

  changeType(event:any):void{
    this.type = event.target.value;
  }

  searhBy(param:string):void{
    if(this.type == "artist"){
      this.fetchArtistAlbums(param);
    }else{
      this.fetchTracksByArtistName(param);
    }
  }

  fetchArtistAlbums(artistName: string): void {
    this.albums = [];
    this.spotifyService.getAccessToken_();
    this.spotifyService.searchArtistAlmbumsByName(artistName).subscribe(
      albums => {
        albums?.albums.items.forEach((item: any) => {
          this.albums.push(item);
        });
      }
    );
    this.select.nativeElement.value = "artist";
    this.type = "artist";
    this.spotifyService.saveSearh(`${artistName},artist`);
    this.updateHistory();
  }

  fetchTracksByArtistName(artistName: string): void {
    this.tracks = [];
    this.spotifyService.getAccessToken_();
    this.spotifyService.searchTracksByArtistName(artistName).subscribe(
      tracks => {
        tracks?.tracks.items.forEach((item: any) => {
          this.tracks.push(item);
        });
      }
    );
    this.select.nativeElement.value = "track";
    this.type = "track";
    this.spotifyService.saveSearh(`${artistName},track`);
    this.updateHistory();
  }

}
