import config from "../config.json";

const streamingServicesAuthUrl = {
  SPOTIFY:
    'https://accounts.spotify.com/authorize?show_dialog=true' +
    '&client_id=' + config.spotify.clientId +
    '&response_type=code' +
    '&redirect_uri=' + config.spotify.redirectUri +
    '&scope=' + config.spotify.scopes,
  AMAZON:
    'https://www.amazon.com/ap/oa?' +
    'client_id=' + config.amazon.clientId +
    '&scope=' + config.amazon.scopes +
    '&response_type=code' +
    '&redirect_uri=' + config.amazon.redirectUri,
  DEEZER: 'https://connect.deezer.com/oauth/auth.php?' +
    'app_id=' + config.deezer.appId +
    '&redirect_uri=' + config.deezer.redirectUri +
    '&perms=' + config.deezer.scopes,
  YOUTUBE: 'https://accounts.google.com/o/oauth2/auth?' +
    'client_id=' + config.youtube.client_id +
    '&redirect_uri=' + config.youtube.redirect_uris[1] +
    '&response_type=token' +
    '&scope=' + config.youtube.scopes
}

export default streamingServicesAuthUrl