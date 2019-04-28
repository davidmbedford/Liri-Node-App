# Liri: Node App
 LIRI is a Node.js based app that users can run in a *command line interface* to search for concerts, movies, and music.
 Liri stands for: Language Interpretation and Recognition Interface.

### What it does
This app has four different search options:
##### **Concert-this**
  * enables you to search for concerts across the US
##### **Song-this**
  * enables you to search for info on almost any song
##### **Movie-this**
  * enables you to look up details and a summary of almost any movie
##### **Do-it!**
  * If you select this option, you will get a random bit of information!

### Directions
1. Navigate to the file (liri.js), and enter the following into the CLI: node liri.js.
2. Select one of the options listed above, and hit ENTER.
3. Depending on your selections, write-in a movie title, song name, artist or band - and hit ENTER.

### How it works
This app uses Node.js technology to run in the command line. For my project - and all others - I use Git Bash as my CLI.

The project uses javascript and several node packages, including:
* Axios
* Moment
* Inquirer
* Node-Spotify-API

The Node-Spotify-API package handles the *Song-this* search. The other API's are:
* OMDB
* BandsInTown
