import axios from "axios";
import { IStreamingService } from "../types/IStreamingService";
import { IPlaylist } from "../types/IPlaylist";
import { ITrack } from "../types/ITrack";
import config from "../../config.json";
import youtubeStore from "../stores/youtubeStore";
import useYoutubeStore from "../stores/youtubeStore";

const vBaseUrl = 'https://youtube.googleapis.com/youtube/v3/'

const login = async (pAccessToken: string) => {
  youtubeStore.getState().setAuthenticated(pAccessToken, 99999)
  return
}

const getPlaylists = async (): Promise<IPlaylist[]> => {
  let vReturn: IPlaylist[] = []
  await axios.get(`${vBaseUrl}playlists`, {
    params: {
      part: 'snippet,contentDetails',
      maxResults: 50,
      mine: true,
      key: config.youtube.key
    },
    headers: {
      Authorization: 'Bearer ' + youtubeStore.getState().token
    }
  })
    .then(pResult => {
      // @ts-ignore
      vReturn = pResult.data.items.map(cItem => ({
        id: cItem.id,
        title: cItem.snippet.title,
        imageUrl: cItem.snippet.thumbnails.medium.url,
        howManyTracks: cItem.contentDetails.itemCount
      }))
    })
    .catch(e => console.error(e))

  return vReturn
}

const getPlaylistTracks = async (pPlaylistId: string) => {
  let vReturn: ITrack[] = []
  await axios.post(`https://www.youtube.com/youtubei/v1/guide`, {}, {
    params: {
      // part: 'snippet',
      // playlistId: pPlaylistId,
      // maxResults: 50,
      key: config.youtube.key,
      prettyPrint: false
    },
    headers: {
      Authorization: 'Bearer ' + youtubeStore.getState().token
    }
  })
    .then(pResult => {
      // @ts-ignore
      vReturn = pResult.data.items.map((cItem, cIndex) => ({
        key: cIndex,
        id: cItem.snippet.resourceId.videoId,
        title: cItem.snippet.title,
        artists: [cItem.snippet.videoOwnerChannelTitle],
      }))
    })
    .catch(e => console.error(e))

  return {tracks: vReturn, total: vReturn.length}
}

const getPlaylistById = async (pPlaylistId: string): Promise<IPlaylist> => {
  return {
    imageUrl: "", title: "",
    id: ''
  }
}

const getInternalSongId = async (pIsrc: string): Promise<string | null> => {
  return null
}

interface INewPlaylistResponse {
  id: number
}

const createNewPlaylist = async (pName: string): Promise<string> => {
  return ''
}

const addTracksToPlaylist = async (pPlaylistId: string, pTracksIds: string[]) => {
  return
}

const getAuthToken = () => useYoutubeStore.getState().token

const youtubeService: IStreamingService = {
  title: 'YouTube',
  login: login,
  getPlaylists: getPlaylists,
  getPlaylistTracks: getPlaylistTracks,
  getInternalSongId: getInternalSongId,
  createNewPlaylist: createNewPlaylist,
  getPlaylistById: getPlaylistById,
  addTracksToPlaylist: addTracksToPlaylist,
  getAuthToken: getAuthToken
}

export default youtubeService