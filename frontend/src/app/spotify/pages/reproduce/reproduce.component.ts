import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'reproduce',
  standalone: true,
  imports: [],
  templateUrl: './reproduce.component.html',
  styleUrl: './reproduce.component.css'
})
export class ReproduceComponent {
  public item:any;
  public link:string = "";

  constructor(
    private activetedRoute: ActivatedRoute,
    private router:Router,
    private spotifyService: SpotifyService,
    private location: Location
  ){}
  ngOnInit():void{
    this.activetedRoute.params
      .pipe(
         switchMap(({id})=> this.spotifyService.getTrackById(id))
      )
      .subscribe(track =>{
        if(!track) return this.router.navigateByUrl('');
        else{
          this.item = track
          this.getString();
          return;
        };
      }
    )
  }

  getString(){
    this.link = this.item.preview_url;
  }

  goBack():void{
    this.location.back();
  }


}
