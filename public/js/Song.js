var Song = function(meta){
	var track = meta;

	var HTMLify = function(){
		var html = '<div class="song-bag">';
		html += (track.artwork_url) ? '<img src="' + track.artwork_url + '">' : '<img src="img/default.jpg">';

		html += '<ul>';
		html += '	<li>'          + track.title +         '</li>';
		html += '	<li>By: '      + track.user.username + '</li>';
		html += '	<li><a href="' + track.permalink_url + '">SoundCloud</a></li>';
		// html += '<li></li>';
		// html += '<li></li>';
		html += '</ul>';

		html += '</div>'
		return html;
	}

	return{
		HTMLify: HTMLify,
	}
}