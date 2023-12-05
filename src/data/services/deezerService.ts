import axios from "axios";
import { IStreamingService } from "../types/IStreamingService";
import { IPlaylist } from "../types/IPlaylist";
import { ITrack } from "../types/ITrack";
import qs from "qs";
import config from "../../config.json";
import deezerStore from "../stores/deezerStore";
import useDeezerStore from "../stores/deezerStore";
import { IDeezerPlaylist, IDeezerTokenResponse, IDeezerResponseData, IDeezerTrack } from "./types/deezerServiceTypes";

const login = async (pCode: string) => {
  await axios.get<string>(config.apiBaseUrl + 'deezer/get-token', {
    params: {
      code: pCode
    }
  })
    .then(pResponse => {
      // @ts-ignore
      const vResponse: IDeezerTokenResponse = qs.parse(pResponse.data)
      deezerStore.getState().setAuthenticated(vResponse.access_token, vResponse.expires)
      return pResponse
    })
    .catch(e => console.error(e))
}

const getPlaylists = async (): Promise<IPlaylist[]> => {
  let vReturn: IPlaylist[] = []
  await axios.get<IDeezerPlaylist>('https://api.deezer.com/user/me/playlists', {
    params: {
      output: 'json',
      access_token: useDeezerStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = pResult.data.data.map(cItem => ({
        id: cItem.id,
        title: cItem.title,
        imageUrl: cItem.picture_medium,
        howManyTracks: cItem.nb_tracks
      }))
    })
    .catch(e => console.error(e))

  return vReturn
}

const getPlaylistTracks = async (pPlaylistId: string) => {
  let vReturn: ITrack[] = []
  await axios.get<IDeezerResponseData>(`https://api.deezer.com/playlist/${pPlaylistId}/tracks`, {
    params: {
      output: 'json',
      access_token: useDeezerStore.getState().token,
      limit: 1000
    }
  })
    .then(pResult => {
      vReturn = pResult.data.data.map((cItem, cIndex) => ({
        key: cIndex,
        id: cItem.id.toString(),
        title: cItem.title,
        artists: [cItem.artist.name],
        imageUrl: cItem.album.cover_medium,
        album: cItem.album.title,
        length: cItem.duration * 1000,
        isrc: cItem.isrc
      }))
    })
    .catch(e => console.error(e))

  return {tracks: vReturn, total: vReturn.length}
}

const getPlaylistById = async (pPlaylistId: string): Promise<IPlaylist> => {
  let vReturn: IPlaylist = {
    imageUrl: "", title: "",
    id: ''
  }

  await axios.get<any>(`https://api.deezer.com/playlist/${pPlaylistId}`, {
    params: {
      output: 'json',
      access_token: useDeezerStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = {
        id: pResult.data.id.toString(),
        title: pResult.data.title,
        imageUrl: pResult.data.picture_medium,
        url: pResult.data.link,
        howManyTracks: pResult.data.nb_tracks
      }
    })
    .catch(e => console.error(e))

  return vReturn
}

const getInternalSongId = async (pIsrc: string): Promise<string | null> => {
  let vReturn: string | null = null
  await axios.get<IDeezerTrack>('https://api.deezer.com/2.0/track/isrc:' + pIsrc, {
    params: {
      output: 'json',
      access_token: useDeezerStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = pResult.data.id.toString()
    })
    .catch(e => {
      console.error(e)
      vReturn = null
    })

  return vReturn
}

interface INewPlaylistResponse {
  id: number
}

const createNewPlaylist = async (pName: string): Promise<string> => {
  let vReturn: string = ''

  await axios.post<INewPlaylistResponse>('https://api.deezer.com/user/me/playlists', {}, {
    params: {
      output: 'json',
      access_token: useDeezerStore.getState().token,
      title: pName,
      request_method: 'POST'
    }
  })
    .then(pResult => {
      vReturn = pResult.data.id.toString()
    })
    .catch(e => {
      console.error(e)
    })

  return vReturn
}

const addTracksToPlaylist = async (pPlaylistId: string, pTracksIds: string[]) => {
  await axios.post<INewPlaylistResponse>('https://api.deezer.com/playlist/' + pPlaylistId + '/tracks', {}, {
    params: {
      output: 'json',
      access_token: useDeezerStore.getState().token,
      songs: pTracksIds.join(','),
      request_method: 'POST'
    }
  })
    .then(pResult => {
    })
    .catch(e => {
      console.error(e)
    })
  return
}

const getAuthToken = () => useDeezerStore.getState().token

const deezerService: IStreamingService = {
  title: 'Deezer',
  login: login,
  getPlaylists: getPlaylists,
  getPlaylistTracks: getPlaylistTracks,
  getInternalSongId: getInternalSongId,
  createNewPlaylist: createNewPlaylist,
  getPlaylistById: getPlaylistById,
  addTracksToPlaylist: addTracksToPlaylist,
  getAuthToken: getAuthToken
}

export default deezerService