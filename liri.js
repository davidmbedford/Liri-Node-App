require('dotenv').config();
const axios = require('axios');
const Spotify = require('node-spotify-api');

let keys = require('./keys.js');
let nodeArgs = process.argv;
let inputName = "";

for (let i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    inputName = inputName + "+" + nodeArgs[i];
  }
  else {
    inputName += nodeArgs[i];
  }
}

// concert-this
// node liri.js concert-this <artist/band name here>
/////////////////////////////////////////////////////////////////
// Name of the venue                                            \
// Venue location                                                \
// Date of the Event (use moment to format this as "MM/DD/YYYY") /
/////////////////////////////////////////////////////////////////
let bitQueryUrl = 'https://rest.bandsintown.com/artists/' + inputName + '/events?app_id=codingbootcamp';

axios.get(bitQueryUrl).then(
  function(response) {
    console.log(bitQueryUrl);
    // console.log("\n===================\n")
    // console.log('Venue Name: ' + response.data.Title);
    // console.log('Venue Location': + response.data.Year);
    // console.log('Event Date: ' + response.data.Ratings[0].Value);
  }
);

// spotify-this-song
// node liri.js spotify-this-song '<song name here>'
////////////////////////////////////////////////
// Artist(s)                                   \
// The song's name                             \
// A preview link of the song from Spotify     /
// The album that the song is from            /
//////////////////////////////////////////////

// let spoQueryUrl = "'https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx'";
let spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: inputName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log('\n===================\n')
    console.log(data);
    // console.log('Artist(s): ' + response.data.Title);
    // console.log('Song Name: ' + response.data.Year);
    // console.log('Preview link: ' + response.data.Ratings[0].Value);
    // console.log('Album: ' + response.data.Ratings[1].Value);

  });

// movie-this
// node liri.js movie-this '<movie name here>'
//////////////////////////////////////////
// * Title of the movie.                 \
// * Year the movie came out.             \
// * IMDB Rating of the movie.             \
// * Rotten Tomatoes Rating of the movie.  /
// * Country where the movie was produced. \
// * Language of the movie.                /
// * Plot of the movie.                    \
// * Actors in the movie.                 /
//////////////////////////////////////////

let movQueryUrl = 'http://www.omdbapi.com/?t=' + inputName + '&y=&plot=short&apikey=trilogy';

axios.get(movQueryUrl).then(
  function(response) {
    console.log(movQueryUrl);
    console.log('\n===================\n')
    console.log('Movie Title: ' + response.data.Title);
    console.log('Release Year: ' + response.data.Year);
    console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
    console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value );
    console.log('This movie was produced in (country): ' + response.data.Country );
    console.log('Language: ' + response.data.Language);
    console.log('Plot: ' + response.data.Plot);
    console.log('Actors: ' + response.data.Actors);
  }
);

// do-what-it-says
// node liri.js do-what-it-says
/////////////////////////////////////////////////////////////////
// Using the fs Node package, LIRI will take                    \
// the text inside of random.txt and then use it                /
// to call one of LIRI's commands.                              \
//                                                              /
// It should run spotify-this-song for "I Want it That Way,"    \
// as follows the text in random.txt.                           /
//                                                             /
// Edit the text in random.txt to test out                    /
// the feature for movie-this and concert-this.              /
////////////////////////////////////////////////////////////
