let accessToken = null;
const clientId = '54c151be36c842c2afc46f12d3bc19b3';
const redirectUri = "http://localhost:3000/";

export const Spotify = {

  // Set accessToken variable above
  getAccessToken() {
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken) {
      return accessToken;
    } else if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }
  },

  // Hit Spotify API endpoint with search term
  async search(term) {
    try {
      let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        } else {
          jsonResponse.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        }
      } else {
        throw new Error('Request Failed!');
      }
    } catch (error) {
        console.log(error);
    }
  }
}
