export interface IDeezerTokenResponse {
  access_token: string
  expires: number
}

export interface IDeezerPlaylist {
  data: IDeezerPlaylistData[];
}

export interface IDeezerPlaylistData {
  id: string;
  title: string;
  duration: number;
  public: boolean;
  is_loved_track: boolean;
  collaborative: boolean;
  nb_tracks: number;
  fans: number;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  checksum: string;
  tracklist: string;
  creation_date: string;
  md5_image: string;
  picture_type: string;
  time_add: number;
  time_mod: number;
  creator: {
    id: string;
    name: string;
    tracklist: string;
    type: string;
  };
  type: string;
}

export interface IDeezerResponseData {
  data: IDeezerTrack[];
  checksum: string;
  total: number;
}

export interface IDeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  time_add: number;
  artist: IDeezerArtist;
  album: IDeezerAlbum;
  type: string;
  isrc: string;
  share: string;
  track_position: number;
  disk_number: number;
  release_date: string;
  bpm: number;
  gain: number;
  available_countries: string[];
  contributors: IDeezerContributor[];
}

export interface IDeezerArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
  radio: boolean;
  role: string;
}

export interface IDeezerAlbum {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
  link: string;
  release_date: string;
}

export interface IDeezerContributor {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  role: string;
}