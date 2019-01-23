$(document).ready(function() {
  let tweetArea = $('section.new-tweet textarea');
  let counter = $('section.new-tweet .counter');

  tweetArea.on("keyup", function () {
    let tweetLength = $(this).val().length;
    if (tweetLength > 140) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
    counter.text(140 - tweetLength);
  });

});