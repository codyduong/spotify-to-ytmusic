const { default: YTMusic } = require('@codyduong/ytmusicapi');
const request = require('request');

require('dotenv').config();

const ytmAuth = process.env.headers;

const ytm = new YTMusic({ auth: ytmAuth });

// callback for spotify playlists values
async function createYTplaylist(data) {
  for (const playlist of data) {
    const id = await ytm.createPlaylist(playlist.name, {
      description: playlist.description,
    });

    let videos = []
    // Search for YT substitute
    for (const track of playlist.tracks) {
      const results = ytm.search(track.name)
      // Just get the first result, this may not be the right song,
      // you'll probably want to implement a more robust search, or use the ISRC
      // (International Standard Recording Code) instead
      const id = results[0][videoId]
      videos.push(id)
    }

    await ytm.addPlaylistItems(id, {videoIds: videos})
  }
}

const client_id = process.env.client_id; // Your client id
const client_secret = process.env.client_secret; // Your secret
const username = process.env.username;

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic ' +
      Buffer.from(client_id + ':' + client_secret, 'utf-8').toString('base64'),
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const token = body.access_token;
    const options = {
      url: `https://api.spotify.com/v1/users/${username}/playlists`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
      limit: 50,
    };

    let offset = 0;
    let playlists = [];
    // playlists
    (function getPlaylists() {
      request.get(
        Object.assign(options, { offset }),
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            // pull out tracks
            for (const playlist of body.items) {
              let tracks = [];
              let trackOffset = 0;
              (function getTracks() {
                request.get(
                  {
                    url: playlist.tracks.href,
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                    json: true,
                    limit: 50,
                  },
                  (trackE, trackR, trackBody) => {
                    if (!trackE && trackR.statusCode === 200) {
                      trackOffset += 50;
                      tracks = tracks.concat(trackBody.items);
                      if (trackBody.next !== null) {
                        getTracks();
                      } else {
                        playlists.push(Object.assign(playlist, { tracks }));
                        offset += 50;
                        if (body.next !== null) {
                          getPlaylists();
                        } else {
                          createYTplaylist(playlists);
                        }
                      }
                    }
                  }
                );
              })();
            }
          }
        }
      );
    })();
  }
});
