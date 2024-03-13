import { SpotifyTopTracks } from './../../interfaces/spotify-top-tracks';
import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Track } from './../../interfaces/spotify-top-tracks';

@Component({
    selector: 'card-list',
    standalone: true,
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.css',
    imports: [CardComponent]
})
export class CardListComponent {
  @Input()
  public items: any[] = [];
}
