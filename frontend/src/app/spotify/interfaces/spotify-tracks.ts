export interface SpotifyTracks {
    tracks: Tracks;
}

export interface Tracks {
    href:     string;
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
    items:    Item[];
}

export interface Item {
    album:             Album;
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    popularity:        number;
    preview_url:       null | string;
    track_number:      number;
    type:              ItemType;
    uri:               string;
    is_local:          boolean;
    items:             Item[];
}

export interface Album {
    album_type:             AlbumTypeEnum;
    total_tracks:           number;
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    type:                   AlbumTypeEnum;
    uri:                    string;
    artists:                Artist[];
}

export enum AlbumTypeEnum {
    Album = "album",
    Compilation = "compilation",
    Single = "single",
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

export interface Image {
    url:    string;
    height: number;
    width:  number;
}

export enum ReleaseDatePrecision {
    Day = "day",
    Year = "year",
}

export interface ExternalIDS {
    isrc: string;
}

export enum ItemType {
    Track = "track",
}
