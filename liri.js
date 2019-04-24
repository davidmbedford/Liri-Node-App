//var dotenv = require("dotenv").config()

//var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);
// Client ID 5dd7210c7e764cf483dc8add6dab1d61
// Client Secret 12c754344f154dfca62a171195cff7ce

//var bandsitUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
///////////////////////////////////////////////////////////////////////////////////////////////////
var axios = require("axios");

var nodeArgs = process.argv;

var inputName = "";

for (var i = 2; i < nodeArgs.length; i++) {

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

var movQueryUrl = "http://www.omdbapi.com/?t=" + inputName + "&y=&plot=short&apikey=trilogy";

console.log(movQueryUrl);

axios.get(movQueryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
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
