const dotenv = require("dotenv").config();
const axios = require("axios");
const spotify = require('node-spotify-api');
let keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);
// Client ID 5dd7210c7e764cf483dc8add6dab1d61
// Client Secret 12c754344f154dfca62a171195cff7ce

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

// spotify-this-song
// node liri.js spotify-this-song '<song name here>'
////////////////////////////////////////////////
// Artist(s)                                   \
// The song's name                             \
// A preview link of the song from Spotify     /
// The album that the song is from            /
//////////////////////////////////////////////




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

let movQueryUrl = "http://www.omdbapi.com/?t=" + inputName + "&y=&plot=short&apikey=trilogy";

axios.get(movQueryUrl).then(
  function(response) {
    console.log(movQueryUrl);
    console.log("\n===================\n")
    console.log("Movie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value );
    console.log("This movie was produced in (country): " + response.data.Country );
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
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
