import axios from "axios";
import { IStreamingService } from "../types/IStreamingService";
import { IPlaylist } from "../types/IPlaylist";
import config from '../../config.json'
import { IAmazonTokenResponse, UserPlaylist } from "./types/amazonServiceTypes";


const getUser = async () => {
  axios.get('https://api.music.amazon.dev/v1/me', {
    headers: {
      // Authorization: 'Bearer ' + useAuthStore.getState().amazon.token,
      'x-api-key': config.amazon.profileId
    }
  })
    .then(pResponse => {
    })
}

const login = async (pCode: string) => {
  axios.get<IAmazonTokenResponse>('http://localhost:8080/amazon/get-token', {
    params: {
      code: pCode
    }
  })
    .then(pResponse => {
      // authStore.getState().setAmazon(true, pResponse.data.access_token)
      getUser()
      return pResponse
    })
    .catch(e => console.error(e))
}

const getPlaylists = async (): Promise<IPlaylist[]> => {
  let vReturn: IPlaylist[] = []
  await axios.get<UserPlaylist>('https://api.music.amazon.dev/v1/me/followed/playlists', {
    headers: {
      // Authorization: 'Bearer ' + useAuthStore.getState().amazon.token,
      'x-api-key': config.amazon.profileId
    }
  })
    .then(pResult => {
      vReturn = pResult.data.data.user.followedPlaylists.edges.map(cItem => ({
        id: cItem.node.id,
        title: cItem.node.name,
        imageUrl: ''
      }))
    })
    .catch(e => console.error(e))

  return vReturn
}

const getPlaylistTracks = async (pPlaylistId: string) => {
  return {tracks: [], total: 50}
}

const getInternalSongId = async (pIsrc: string) => ''

const createNewPlaylist = async (pName: string): Promise<string> => {
  return ''
}

const getPlaylistById = async (pId: string): Promise<IPlaylist> => {
  return {
    id: "", imageUrl: "", title: ""
  }
}

const addTracksToPlaylist = async (pPlaylistId: string, pTracksIds: string[]) => {
  return
}

const amazonService: IStreamingService = {
  title: 'Amazon',
  login: login,
  getPlaylists: getPlaylists,
  getPlaylistTracks: getPlaylistTracks,
  getInternalSongId: getInternalSongId,
  createNewPlaylist: createNewPlaylist,
  getPlaylistById: getPlaylistById,
  addTracksToPlaylist: addTracksToPlaylist,
  getAuthToken: () => ''
}

export default amazonService