require('dotenv').config();
const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');
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
    console.log('\n===================\n');
    console.log('BANDS IN TOWN');
    console.log(bitQueryUrl);

    let concerts = response.data;
    // console.log(concerts)
    for (var i in concerts) {
      console.log('Line-Up: ' + concerts[i].lineup);
      console.log('Venue Name: ' + concerts[i].venue.name);
      console.log('Venue Location: ' + concerts[i].venue.city + ' ' + concerts[i].venue.region + ' ' + concerts[i].venue.country);
      let eventTimeRaw = concerts[i].datetime;
      let eventTime = moment(eventTimeRaw, "YYYY-MM-DDThh:mm").format("LLLL");
      console.log('Event Date: ' + eventTime);
      console.log(' . . . ');
    }

    console.log('\n===================\n')
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

let spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: inputName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log('\n===================\n')
    let spotifyInfo = data.tracks.items;
    // console.log(spotifyInfo[0])
    console.log("Artist: " + spotifyInfo[0].artists[0].name);
    console.log("Song Name: " + spotifyInfo[0].name);
    console.log("Album Name: " + spotifyInfo[0].album.name)
    console.log("Link to Spotify: " + spotifyInfo[0].external_urls.spotify);
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
    console.log('\n===================\n');
    console.log('OMDB Results')
    console.log(movQueryUrl);
    console.log('Movie Title: ' + response.data.Title);
    console.log('Release Year: ' + response.data.Year);
    console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
    console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value );
    console.log('This movie was produced in (country): ' + response.data.Country );
    console.log('Language: ' + response.data.Language);
    console.log('Plot: ' + response.data.Plot);
    console.log('Actors: ' + response.data.Actors);
    console.log('\n===================\n');
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


inquirer
  .prompt([

    {
      type: "list",
      message: "Options: ",
      choices: ["Concert-this", "Song-this", "Movie-this"],
      name: "command"
    },

  ])
  .then(function(response) {
    let command = response.command

    if (command =) {

    } else if (command =) {

    } else if (command =) {

    } else if (command =){

    }

  });
