import { IPlaylist } from "./IPlaylist";
import { ITrack } from "./ITrack";

export interface IStreamingService {
  title: string
  getPlaylists: () => Promise<IPlaylist[]>
  getPlaylistTracks: (pPlaylistId: string, pOffset: number) => Promise<{ tracks: ITrack[], total: number }>
  login: (pCode: string) => Promise<void>
  getInternalSongId: (pIsrc: string) => Promise<string | null>
  createNewPlaylist: (pName: string) => Promise<string>
  getPlaylistById: (pId: string) => Promise<IPlaylist>
  addTracksToPlaylist: (pPlaylistId: string, pTracksIds: string[]) => Promise<void>
  getAuthToken: () => string
}