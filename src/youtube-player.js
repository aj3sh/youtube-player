$(document).ready(function($) {
	console.log('youtube-player.js loaded.')
});

var youtubeModalOpen = function(e){
	e.preventDefault();
	e.stopPropagation();
	var videoID = $(this).data('id');
	$("#youtube-iframe").attr('src', 'https://www.youtube.com/embed/'+videoID+'?ecver=2&autoplay=1');
	$('body').addClass('youtube-opened');
}

$('a.youtube-player-link').click(function(e){
	e.preventDefault();
	var embedUrl = $(this).attr('href');

	if( !embedUrl.includes('embed/'))
		return;
	var arr = embedUrl.split('embed/')
	if(arr.length != 2)
		return;
	videoID = arr[1];
	if( videoID.trim() == "" )
		return;

	$("#youtube-iframe").attr('src', 'https://www.youtube.com/embed/'+videoID+'?ecver=2&autoplay=1');
	$('body').addClass('youtube-opened');
});

$('.youtube-player').each(function(index, e) {
	var embedUrl = $(this).data('embed');
	if( !embedUrl.includes('embed/'))
		return;
	var arr = embedUrl.split('embed/')
	if(arr.length != 2)
		return;
	videoID = arr[1];
	if( videoID.trim() == "" )
		return;

	var thumbnail = $('<div class="youtube-thumbnail"></div>');
	thumbnail.css('backgroundImage','url(https://i1.ytimg.com/vi/'+videoID+'/hqdefault.jpg)');

	var playIcon = $('<div class="youtube-play-icon" data-id="'+videoID+'"><i class="fa fa-play"></i></div>');
	playIcon.click(youtubeModalOpen);
	thumbnail.append(playIcon);

	$(this).empty();
	$(this).append(thumbnail);

});

$('body').append('<div id="youtube-modal" style="display: none;"><div id="youtube-modal-close" title="close"><svg height="30px" width="30px" viewBox="0 0 16 16"><path d="M13 4L12 3 8 7 4 3 3 4 7 8 3 12 4 13 8 9 12 13 13 12 9 8z" fill="#fff"></path></svg></div><div id="youtube-container"><div class="embed-responsive embed-responsive-16by9"><iframe id="youtube-iframe" class="embed-responsive-item" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div></div>');

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
    	$('#youtube-modal-close').click(); 
    }
});

$('#youtube-modal-close').click(function(event) {
	$('body').removeClass('youtube-opened');
	$("#youtube-iframe").attr('src', '');
});