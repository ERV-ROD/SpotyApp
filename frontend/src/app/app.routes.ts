import { Routes } from '@angular/router';
import { HomeComponent } from './spotify/pages/home/home.component';

import { ReproduceComponent } from './spotify/pages/reproduce/reproduce.component';
import { SearchArtistComponent } from './spotify/pages/search/search-artist.component';
import { AlbumComponent } from './spotify/pages/album/album.component';
import { ArtistPageComponent } from './spotify/pages/artist-page/artist-page.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search/artists',
    component: SearchArtistComponent,
  },
  {
    path: 'reproduce/:id',
    component: ReproduceComponent,
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
