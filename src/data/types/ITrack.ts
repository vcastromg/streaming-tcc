export interface ITracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ITrack[];
}

export interface ITrack {
  key: number
  id: string
  imageUrl?: string
  title: string
  album: string
  artists: string[]
  length?: number
  isrc?: string
}