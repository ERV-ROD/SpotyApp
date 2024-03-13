import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/spotify-tracks';

@Component({
  selector: 'tracks-table',
  standalone: true,
  imports: [],
  templateUrl: './tracks-table.component.html',
  styleUrl: './tracks-table.component.css'
})
export class TracksTableComponent {
  @Input()
  public tracks: Item[] = [];

  ngOnInit(){
    console.log(this.tracks);
  }

}
