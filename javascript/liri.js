//require("dotenv").config();
var fs = require('fs')
var Keys = require("./keys.js");
var axios = require("axios");

var search = process.argv[2];
var term = process.argv[3];


const Look = function () {
    console.log("here")
    // node liri.js concert-this <artist/band name here>



    this.findBand = function (band) {
        var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
        axios.get(URL).then(function (response) {

            var jsonData = response.data;

            var bandData = [
                "Venue: " + jsonData.venue.name,
                "Location: " + jsonData.venue.city,
                "Date: " + jsonData.datetime,
            ].join("\n\n");

            fs.appendFile("log.txt", bandData, function (err) {
                if (err) throw err;
                console.log(bandData);
            });
        });

    };
    //node liri.js spotify-this-song '<song name here>'

    this.findSong = function (song) {

        var keys = new Keys(keys.spotifyK);
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

        axios.get(queryUrl).then(function (response) {

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
};

Look.prototype.findBand = function (band) {
    var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {

        var jsonData = response.data;

        var bandData = [
            "Venue: " + jsonData.venue.name,
            "Location: " + jsonData.venue.city,
            "Date: " + jsonData.datetime,
        ].join("\n\n");

        fs.appendFile("log.txt", bandData, function (err) {
            if (err) throw err;
            console.log(bandData);
        });
    });

};

if (!search) {
    search = "show";
}


if (!term) {
    term = "Andy Griffith";
}


if (search === "movie") {
    console.log("Searching for Movie");
    Look.findMovie(term);
} if (search === "song") {
    console.log("Searching for song")
    Keys.findSong(term);
} if (search === "band") {
    console.log("Searching for Song");
    Look.findBand(term)
}





