var apiKeys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var client = new Twitter({
  consumer_key: apiKeys.twitterKeys.consumer_key,
  consumer_secret: apiKeys.twitterKeys.consumer_secret,
  access_token_key: apiKeys.twitterKeys.access_token_key,
  access_token_secret: apiKeys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: apiKeys.spotifyKeys.id,
  secret: apiKeys.spotifyKeys.secret
});


var command = process.argv[2];
var input = process.argv[3];

function commandHandler(commandType, commandSpecifics) {
  switch(commandType) {
    case "my-tweets":
      client.get('statuses/user_timeline', {screen_name: 'sumeet36993623'}, function(error, tweets, response){
        if (!error) {
          tweets.forEach(function(tweet){
            console.log(tweet.text);
          });
        }
      });
      break;
    case "spotify-this-song":
      var song = commandSpecifics;
      if(!song) {
        console.log('"The Sign" by Ace of Base');
      } else {
        spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
         if ( err ) {
           console.log('Error occurred: ' + err);
           return;
         }
         console.log(data);
         data.tracks.items[0].artists.forEach(function(artist){
           console.log('Artist Name:', artist.name);
         });
         console.log('Album Name:', data.tracks.items[0].album.name);
         console.log('Song Name:', data.tracks.items[0].name);
         console.log('Preview Url:', data.tracks.items[0].preview_url);
        });
      }
      break;
    case "movie-this":
      var movie = commandSpecifics;
      if(!movie) {
        movie = "Mr. Nobody";
        Request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&r=json", function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var bodyJSON = JSON.parse(body);
            for(let prop in bodyJSON) {
              console.log(prop +":", bodyJSON[prop]);
            }
          }
        });
      } else {
        Request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&r=json", function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var bodyJSON = JSON.parse(body);
            for(let prop in bodyJSON) {
              console.log(prop +":", bodyJSON[prop]);
            }
          }
        });
      }
      break;
    case "do-what-it-says":
      var filename = commandSpecifics;
        fs.readFile(filename, function(error, data){
          if(error) {
            console.log(error);
          } else {
            var fileReadCommand = data.toString().trim().split(",");
            commandHandler(fileReadCommand[0],fileReadCommand[1]);
          }
        });
      break;
  }
}

commandHandler(command, input);