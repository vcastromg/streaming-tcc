export interface ISpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface ISpotifyUserPlaylistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ISpotifyUserPlaylistResponse[];
}

export interface ISpotifyUserPlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface ISpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface IPlaylistTracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ISpotifyItem[];
}

export interface ISpotifyItem {
  added_at: string;
  added_by: ISpotifyAddedBy;
  is_local: boolean;
  track: ISpotifyTrack;
}

export interface ISpotifyAddedBy {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ISpotifyTrack {
  album: ISpotifyAlbum;
  artists: ISpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface ISpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  copyrights: ISpotifyCopyright[];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: ISpotifyArtist[];
}

export interface ISpotifyArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ISpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface ISpotifyCopyright {
  text: string;
  type: string;
}