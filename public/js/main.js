$(document).ready(init);
var curSound,
	volume,
	songs = [];

function init(){
	SC.initialize({
		client_id: "52ab8a2269fd4a920ef9a7a2ab5b5f0d",
		redirect_url: ""
	});
	setHandlers();
}

function setHandlers(){
	$('#play-btn').click(playSong);
	$('#stop-btn').click(stopSong);
	$('#pause-btn').click(pauseSong);
	$('#next-btn').click(nextSong);
	$('#mute-btn').click(muteSong);
}

function muteSong(){
	if(curSound)
		curSound.mute();
}

function pauseSong(){
	if(curSound)
		curSound.pause();
}

function stopSong(){
	if(curSound)
		curSound.stop();
}

function playSong(req){
	if(curSound){
		curSound.stop();
		curSound.play();
	}else{
		getNextSong();
	}
}

function nextSong(){
	if(curSound)
		curSound.stop();
	getNextSong();
}

function getNextSong(){
    $.ajax({ 
           url: '/next_song',
           type: 'POST',
           cache: false, 
           success: ajaxSuccess,
           error: function(jqXHR, textStatus, err){
               alert('text status '+textStatus+', err '+err)
           }
    });
}

function ajaxSuccess(data){
	var track_url = data.url;
	SC.get('/resolve', { url: track_url }, function(track) {
		console.log(track);
		var newSong = new Song(track); 
		$('#song-container').prepend(newSong.HTMLify());
		$('.song-bag:first-child').addClass("current-song");
		$('.song-bag:not(:first-child)').removeClass("current-song");

		if($('#song-container > *').length > 4)
			$('.song-bag:last-child').remove();

		songs.push(newSong);
		SC.stream("/tracks/" + track.id, function(sound){
			curSound = sound;
			sound.play({
				onfinish: function(){
					console.log("");
					getNextSong();
				}
			});
		});
	});   
}