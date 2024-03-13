import { RouterModule } from '@angular/router';
import { Artist } from '../../interfaces/new-realeases';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  item: any;
  image: string = "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg";
  artists: Artist[] = [];
  hasPreview:boolean=false;
  IsAlbum:boolean = false;

  ngOnInit(){
    if(this.item.type == "album"){
      this.getAlbumImage();
      this.getArtists();
      this.IsAlbum = true;
    }
    if(this.item.type == "track"){
      this.getTrackImage();
      this.getArtists();
      this.getPreview();
    }
  }

  getAlbumImage():void{
    if(this.item.images.length != 0){
      this.image = this.item.images[0].url || " ";
    }
  }

  getTrackImage():void{
    if(this.item.album.images.length != 0){
      this.image = this.item.album.images[0].url || " ";
    }
  }

  getArtists():void{
    this.artists = this.item.artists || [];
  }

  getPreview():void{
    if(this.item.preview_url != null){
      this.hasPreview = true;
    }
  }

}
