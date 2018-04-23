let accessToken = '';
const clientId = '54c151be36c842c2afc46f12d3bc19b3';
const redirectUri = "http://vrrajkum.github.io/Jammming";

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
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }
  },

  // Search Spotify API for given search term and return array of results
  async search(term) {
    const accessToken = this.getAccessToken();

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
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        }
      } else {
        throw new Error('Request Failed!') && console.log(response);
      }
    } catch (error) {
        console.log(error);
    }
  },

  // Save user's playlist to user's Spotify account
  async savePlaylist(playlistName, trackUris) {
    if (!(playlistName && trackUris.length)) {
      return;
    } else {
      const accessToken = this.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}`};
      let userId = '';
      try {
        let response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: headers
        });
        if (response.ok) {
          let jsonResponse = await response.json();
          userId = jsonResponse.id;
          let response2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          });
          if (response2.ok) {
            let jsonResponse2 = await response2.json();
            let playlistId = jsonResponse2.id;
            let response3 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            });
            if (response3.ok) {
              let jsonResponse3 = await response3.json();
              return jsonResponse3;
            } else {
              throw new Error("Request Three Failed!") && console.log(response);
            }
          } else {
            throw new Error("Request Two Failed!") && console.log(response);
          }
        } else {
          throw new Error("Request One Failed!") && console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
