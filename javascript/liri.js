require("dotenv").config();
var fs = require('fs')
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var term = process.argv[3];

const Look = function () {

    this.findBand = function (band) {
        var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
        axios.get(URL).then(function (response) {


            var jsonData = response.data;

            console.log("Upcoming concerts for " + band + ":");

            for (var i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];


                var bandData = [
                    "Venue: " + show.venue.name,
                    "Location: " + show.venue.region || show.venue.country,
                    "Date: " + show.datetime,
                ].join("\n\n");

                console.log(bandData);

                fs.appendFile("log.txt", bandData, function (err) {
                    if (err) throw err;
                    console.log(bandData);
                });
            }
        });

    };


    this.findSong = function (song) {


        if (!search) {
            search = 'The Sign';
        }

        if (!term) {
            term = 'Ace of Base'
        }
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var jsonData = data.tracks.items;

            var songData = [
                "Artist(s): " + jsonData[0].artists[0].name,
                "Song Name: " + jsonData[0].name,
                "Preview Link: " + jsonData[0].preview_url,
                "Album: " + jsonData[0].album.name,
            ].join("\n\n");

            fs.appendFile("log.txt", songData, function (err) {
                if (err) throw err;
                console.log(songData);
            });
        });

    };

    this.findMovie = function (movie) {

        var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        console.log(URL);

        axios.get(URL).then(function (response) {

            var jsonData = response.data;


            var showData = [
                "Title: " + jsonData.Title,
                "Release Year: " + jsonData.Year,
                "OMDB Rating: " + jsonData.imdbRating,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors,
            ].join("\n\n")

            fs.appendFile("log.txt", showData, function (err) {
                if (err) throw err;
                console.log(showData);
            });
        });
    };

    this.doWhatItSays = function() {
        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) throw err;
          console.log(data);
      
        
        });
      };
      



};



const go = new Look();




if (search === "movie-this") {
    console.log("Searching for Movie");
    go.findMovie(term);
} if (search === "spotify-this-song") {
    console.log("Searching for song")
    go.findSong(term);
} if (search === "concert-this") {
    console.log("Searching for Song");
    go.findBand(term)
} if (search === "do-what-it-says") {
    console.log()
    go.doWhatItSays(term)
}








