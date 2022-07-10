# Spotify to YTMusic
This is a demonstration of [ytmusicapiJS](https://github.com/codyduong/ytmusicapiJS).

Just as a disclaimer, I have provided this code as an example. I can't gurantee it'll work the best (or at all).

## Setup
<b> Prerequisites </b>
* NodeJS
* Have made at least one playlist made manually on YTMusic

<b> Steps </b>
1. Install dependencies with preferred package manager
`npm install` or `yarn install`
2. Setup a spotify app at https://developer.spotify.com/my-applications
3. Create an .env with `cp .env-EXAMPLE .env`
    * Replace the necessary variables, in order to get ytmusic credentials follow instructions here: https://github.com/codyduong/ytmusicapiJS
4. Run index.js
```bash
# Either run it directly with node
node index.js
# OR through package.json and your package manager
npm transfer
# OR
yarn transfer
```