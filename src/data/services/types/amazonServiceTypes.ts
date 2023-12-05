export interface IAmazonTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface IAmazonUserPlaylistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: IAmazonUserPlaylistResponse[];
}

export interface IAmazonUserPlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: {
    amazon: string;
  };
  href: string;
  id: string;
  images: AmazonImage[];
  name: string;
  owner: {
    external_urls: {
      amazon: string;
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

export interface AmazonImage {
  url: string;
  height: number;
  width: number;
}

export interface UserPlaylist {
  data: {
    user: {
      id: string;
      name: string;
      url: string;
      followedPlaylists: {
        pageInfo: {
          hasNextPage: boolean;
        };
        edgeCount: number;
        edges: PlaylistEdge[];
      };
    };
  };
}

export interface PlaylistEdge {
  node: {
    id: string;
    name: string;
    url: string;
  };
}