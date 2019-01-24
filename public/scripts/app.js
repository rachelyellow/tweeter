/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: $form.serialize()
    })
      .done(function( msg ) {
        alert( "Data Saved: " + msg );
      });







  //   $.ajax('/tweets')
  //   .done((response) => {
  //     jQuery.post()
  //     console.log($form.serialize())
  //   })
  //   .fail(() => {
  //     console.err('hello?')
  //   })
  // })










});






function createTweetElement (data) {

  const html = `<article class="tweet">
    <header>
      <img class="thumbnail" src="${data.user.avatars.small}">
      <h2>${data.user.name}</h2>
      <p>${data.user.handle}</p>
    </header>
    <article class="tweet">
      ${data.content.text}
    </article>
    <footer>
      ${data.created_at}
    </footer>
  </article>`;


  return $(html);

}



function renderTweets () {
  $('#tweets-container').append($tweet);
}






const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

console.log($tweet);







});
