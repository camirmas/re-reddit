Template.youtubePlaylist.events({
  'click .next-video': function(e) {
    player2.nextVideo();
  },
  'click .previous-video': function(e) {
    player2.previousVideo();
  },
})

Template.youtubePlaylist.rendered = function() {
  if (Meteor.isClient) {
    var playlistIds = this.data.split(',');
    onYouTubeIframeAPIReady = function () {
      player2 = new YT.Player("playlist-player", {
        height: "400",
        width: "600",
        events: {
          'onReady': onPlayerReady
        }
      });
    };

    function onPlayerReady(event) {
      player2.cuePlaylist({playlist: playlistIds, index: 0});
    }

    YT.load();
  }
}
