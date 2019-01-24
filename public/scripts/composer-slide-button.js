$(document).ready(function() {

  const composeButton = $('#nav-bar .button');
  const tweetComposer = $(".new-tweet");
  const tweetArea = $('section.new-tweet textarea');

  composeButton.on("click", function () {

    tweetComposer.slideToggle('slow');
    tweetArea.focus();

  });

});