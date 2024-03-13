export interface SpotifyAlbumTracks {
    href:     string;
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
    items:    Item[];
}

export interface Item {
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    preview_url:       null | string;
    track_number:      number;
    type:              ItemType;
    uri:               string;
    is_local:          boolean;
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          ArtistType;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export enum ItemType {
    Track = "track",
}
