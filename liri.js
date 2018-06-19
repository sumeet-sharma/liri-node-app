//using .env to hide keys
require("dotenv").config();

//project vars
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];
var twitter = require('twitter');
var client = new twitter(keys.twitter);

var twitter = new Twitter ({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});
