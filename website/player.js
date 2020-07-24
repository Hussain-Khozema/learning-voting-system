// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    class : "embed-responsive-item",
    height: "600px",
    videoId: 'CvSOaYi89B4',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}
function onPlayerStateChange(event) {
}
function stopVideo() {
  player.stopVideo();
}
function seekTo(seconds)
{
  player.seekTo(seconds);
  if(player.getPlayerState() != 1){
    player.playVideo()
  }
}
