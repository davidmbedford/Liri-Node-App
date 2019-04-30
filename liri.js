require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');
const inquirer = require('inquirer');
let keys = require('./keys.js');

let inputName = '';

inquirer
  .prompt([

    {
      type: 'list',
      message: 'Options: ',
      choices: ['Concert-this', 'Song-this', 'Movie-this', 'Do-it!'],
      name: 'command'
    },

    {
      type: 'input',
      message: 'What would you like to search? Hit ENTER for Do-it!',
      name: 'userInput'
    }

  ])
  .then(function(response) {
    let command = response.command;
    inputName = response.userInput;

    if (command === 'Concert-this') {
      concertThis();
    } else if (command === 'Song-this') {
      songThis();
    } else if (command === 'Movie-this') {
      movieThis();
    } else if (command === 'Do-it!') {
      doThis();
    }

  });

// concert-this
///////////////////////////////////////////

const concertThis = function () {
  let bitQueryUrl = 'https://rest.bandsintown.com/artists/' + inputName + '/events?app_id=codingbootcamp';

  axios.get(bitQueryUrl).then(
    function(response) {
      console.log('\n===================\n');
      console.log('BandsInTown Results');

      let concerts = response.data;
      for (var i in concerts) {
        console.log('Line-Up: ' + concerts[i].lineup);
        console.log('Venue Name: ' + concerts[i].venue.name);
        console.log('Venue Location: ' + concerts[i].venue.city + ' ' + concerts[i].venue.region + ' ' + concerts[i].venue.country);
        let eventTimeRaw = concerts[i].datetime;
        let eventTime = moment(eventTimeRaw, 'YYYY-MM-DDThh:mm').format('LLLL');
        console.log('Event Date: ' + eventTime);
        console.log(' . . . ');
      }

      console.log('\n===================\n')
      }
    );
  };

// spotify-this-song
//////////////////////////////////////////

const songThis = function () {
  if (!inputName) {
    inputName = "The Ace of Base"
  }

  let spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: inputName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log('\n===================\n')
    let spotifyInfo = data.tracks.items;
    console.log('Spotify Results');
    console.log('Artist: ' + spotifyInfo[0].artists[0].name);
    console.log('Song Name: ' + spotifyInfo[0].name);
    console.log('Album Name: ' + spotifyInfo[0].album.name)
    console.log('Link to Spotify: ' + spotifyInfo[0].external_urls.spotify);
    });
  };

// movie-this
//////////////////////////////////////////

const movieThis = function () {
  if (!inputName) {
    inputName = "Mr Nobody"
  }

  let movQueryUrl = 'http://www.omdbapi.com/?t=' + inputName + '&y=&plot=short&apikey=trilogy';

  axios.get(movQueryUrl).then(
    function(response) {
      console.log('\n===================\n');
      console.log('OMDB Results');
      console.log('Movie Title: ' + response.data.Title);
      console.log('Release Year: ' + response.data.Year);
      console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
      console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value );
      console.log('This movie was produced in (country): ' + response.data.Country );
      console.log('Language: ' + response.data.Language);
      console.log('Plot: ' + response.data.Plot);
      console.log('Actors: ' + response.data.Actors);
      console.log('\n===================\n');
    });
  }

// do-what-it-says
// node liri.js do-what-it-says
/////////////////////////////////////////////////////////////////
// Using the fs Node package, LIRI will take                    \
// the text inside of random.txt and then use it                /
// to call one of LIRI's commands.                              \
//                                                              /
// It should run spotify-this-song for 'I Want it That Way,'    \
// as follows the text in random.txt.                           /
//                                                             /
// Edit the text in random.txt to test out                    /
// the feature for movie-this and concert-this.              /
////////////////////////////////////////////////////////////

const doThis = function (response) {
  fs.readFile("./random.txt", "utf8", function (err, data) {
    if (err) throw err;

    let output = data.split(',');
    let a = output[0];
    let b = output[1];

    if (a === 'spotify-this-song') {
    inputName = b;
    songThis();
    } else if (a === 'movie-this') {
    inputName = b;
    movieThis();
    } else if (a === 'concert-this') {
    inputName = b;
    concertThis();
    }

  });
}
