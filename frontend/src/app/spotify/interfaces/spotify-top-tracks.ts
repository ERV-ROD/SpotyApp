export interface SpotifyTopTracks {
    tracks: Track[];
}

export interface Track {
    album:         Album;
    artists:       Artist[];
    disc_number:   number;
    duration_ms:   number;
    explicit:      boolean;
    external_ids:  ExternalIDS;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    is_playable:   boolean;
    images:        Image[];
    name:          string;
    popularity:    number;
    preview_url:   string;
    track_number:  number;
    type:          TrackType;
    uri:           string;
    is_local:      boolean;
}

export interface Album {
    album_type:             AlbumTypeEnum;
    total_tracks:           number;
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
    is_playable:            boolean;
}

export enum AlbumTypeEnum {
    Album = "album",
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

export enum TrackType {
    Track = "track",
}
