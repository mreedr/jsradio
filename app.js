var express = require('express');
var app = express();
var count = 0;
var songs = ["https://soundcloud.com/late-night-radio/06-yesterdays-tomorrow",
			 "https://soundcloud.com/xxnozexx/the-cardigans-my-favourite",
			 "https://soundcloud.com/misternorman/christopher-norman-wanting",
			 "https://soundcloud.com/biggigantic/nocturnal-08-fantastic",
			 "https://soundcloud.com/zzward/02-got-it-bad"];

app.use(express.static(__dirname + '/public'));

app.post('/next_song', express.bodyParser(), function (req, res){
   console.log(req);
   console.log('req received');
   res.writeHead(200, { 'Content-Type': 'application/json' });
   //smart way to go through songs   
   res.write(JSON.stringify({ url: songs[count] }));
   res.end();
   count++;
   if(count > songs.length-1) count = 0;
});

app.listen(8001);