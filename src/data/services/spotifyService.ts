import axios from "axios";
import { IStreamingService } from "../types/IStreamingService";
import { IPlaylist } from "../types/IPlaylist";
import { ITrack, ITracks } from "../types/ITrack";
import config from "../../config.json";
import moment from "moment";
import useSpotifyStore from "../stores/spotifyStore";
import { IPlaylistTracks, ISpotifyTokenResponse, ISpotifyUserPlaylistsResponse } from "./types/spotifyServiceTypes";

const login = async (pCode: string) => {
  await axios.get<ISpotifyTokenResponse>(config.apiBaseUrl + 'spotify/get-token', {
    params: {
      code: pCode
    }
  })
    .then(pResponse => {
      const vExpiration: moment.Moment = moment()
      vExpiration.add('seconds', pResponse.data.expires_in)
      useSpotifyStore.getState().setAuthenticated(
        pResponse.data.access_token,
        pResponse.data.refresh_token,
        vExpiration.toISOString())
      return pResponse
    })
}

const getPlaylists = async (): Promise<IPlaylist[]> => {
  let vReturn: IPlaylist[] = []
  await axios.get<ISpotifyUserPlaylistsResponse>('https://api.spotify.com/v1/me/playlists?offset=0&limit=50', {
    headers: {
      Authorization: 'Bearer ' + useSpotifyStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = pResult.data.items.map(cItem => ({
        id: cItem.id ?? '',
        title: cItem.name ?? '',
        imageUrl: cItem.images[0].url ?? '',
        howManyTracks: cItem.tracks.total
      }))
    })
    .catch(e => console.error(e))

  return vReturn
}


const getPlaylistTracks = async (pPlaylistId: string, pOffset: number) => {
  let vReturn: ITrack[] = []
  await axios.get<IPlaylistTracks>(`https://api.spotify.com/v1/playlists/${pPlaylistId}/tracks`, {
    params: {
      offset: pOffset,
      fields: 'next,total,items(track(id,preview_url,album(name,images),external_ids(isrc),artists(name),name,duration_ms))'
    },
    headers: {
      Authorization: 'Bearer ' + useSpotifyStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = pResult.data.items.map((cItem, cIndex) => ({
        key: cIndex,
        id: cItem.track.id,
        title: cItem.track.name,
        artists: cItem.track.artists.map(cArtist => cArtist.name),
        imageUrl: cItem.track.album.images[0].url,
        album: cItem.track.album.name,
        length: cItem.track.duration_ms,
        isrc: cItem.track.external_ids.isrc
      }))
    })
    .catch(e => console.error(e))

  return {tracks: vReturn, total: 50}
}

// const getInternalSongId = async (pIsrc: string) => {
//   await axios.get<ITracks>(`https://api.spotify.com/v1/search?type=track&q=isrc:${pIsrc}`).then(pResponse => {
//     if(pResponse.data.items.length > 0) {
//       return pResponse.data.items[0].isrc
//     }
//
//     return null;
//   })
// }

const getInternalSongId = async (pIsrc: string): Promise<string | null> => {
  let vReturn: string | null = null
  await axios.get<ITracks>(`https://api.spotify.com/v1/search?type=track&q=isrc:${pIsrc}`, {
    headers: {
      Authorization: 'Bearer ' + useSpotifyStore.getState().token
    }
  })
    .then(pResult => {
      // @ts-ignore
      if (pResult.data.tracks.items.length > 0) {
        // @ts-ignore
        vReturn = pResult.data.tracks.items[0].id
      }
    })
    .catch(e => {
      console.error(e)
    })

  return vReturn
}

const getUserName = async () => {
  let vReturn = ''
  await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: 'Bearer ' + useSpotifyStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = pResult.data.id
    })
    .catch(e => {
      console.error(e)
    })

  return vReturn
}

const createNewPlaylist = async (pName: string): Promise<string> => {
  let vReturn = '';
  const vUser = await getUserName();
  await axios.post(`https://api.spotify.com/v1/users/${vUser}/playlists`,
    {
      name: pName,
      public: false,
      collaborative: false,
      description: 'Transferida com StreamingTCC.com'
    },
    {
      headers: {
        Authorization: 'Bearer ' + useSpotifyStore.getState().token
      }
    })
    .then(pResponse => {
      vReturn = pResponse.data.id
    })

  return vReturn;
}

const getPlaylistById = async (pId: string): Promise<IPlaylist> => {
  let vReturn: IPlaylist = {
    id: "", title: "",
    imageUrl: ''
  }
  await axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: 'Bearer ' + useSpotifyStore.getState().token
    }
  })
    .then(pResult => {
      vReturn = {
        id: pResult.data.id,
        title: pResult.data.title,
        imageUrl: pResult.data.images[0].url,
        url: pResult.data.href
      }
    })
    .catch(e => {
      console.error(e)
    })

  return vReturn
}

const addTracksToPlaylist = async (pPlaylistId: string, pTracksIds: string[]) => {
  await axios.post(`https://api.spotify.com/v1/playlists/${pPlaylistId}/tracks`,
    {
      uris: pTracksIds.map(cTrack => `spotify:track:${cTrack}`),
      position: 0
    },
    {
      headers: {
        Authorization: 'Bearer ' + useSpotifyStore.getState().token
      }
    })
}

const getAuthToken = () => useSpotifyStore.getState().token

const spotifyService: IStreamingService = {
  title: 'Spotify',
  login: login,
  getPlaylists: getPlaylists,
  getPlaylistTracks: getPlaylistTracks,
  getInternalSongId: getInternalSongId,
  createNewPlaylist: createNewPlaylist,
  getPlaylistById: getPlaylistById,
  addTracksToPlaylist: addTracksToPlaylist,
  getAuthToken: getAuthToken
}

export default spotifyService