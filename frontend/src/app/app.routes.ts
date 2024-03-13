import { Routes } from '@angular/router';
import { HomeComponent } from './spotify/pages/home/home.component';
import { SearchArtistComponent } from './spotify/pages/search-artist/search-artist.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'search/artists',
        component: SearchArtistComponent
    }

];
