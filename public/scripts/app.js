/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();

    const tweetMessage = $("form").serializeArray()[0].value;
    const tweetErrorMessage = $(".error");

    tweetErrorMessage.text("");
    tweetErrorMessage.slideUp();

    if (tweetMessage === "") {

      tweetErrorMessage.text("Cannot post an empty tweet.");
      tweetErrorMessage.slideDown('fast');

    } else if (tweetMessage.length > 140) {

      tweetErrorMessage.text("The maximum tweet length is 140 characters.")
      tweetErrorMessage.slideDown('fast');

    } else {

      tweetErrorMessage.slideUp();

      $.ajax({
        method: "POST",
        url: "/tweets/",
        data: $form.serialize()
      })
        .done(function() {
          //clear the form and reload tweets
          $form.find("textarea").val("")
          loadTweets();
        });
    }

  });


  function loadTweets () {
    $("#tweets-container").empty();
    $.ajax('/tweets')
    .done((response) => {
      renderTweets(response)
    })
    .fail(() => {
      console.err('Oops! Looks like something went wrong. Please try again.')
    })
  }

  loadTweets();


  function createTweetElement (data) {

    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const html = `<article class="tweets">
      <header>
        <img class="thumbnail" src="${data.user.avatars.small}">
        <h2>${data.user.name}</h2>
        <p>${data.user.handle}</p>
      </header>
      <article class="tweet">
        ${escape(data.content.text)}
      </article>
      <footer>
        ${data.created_at}
        <i class="fa fa-flag" class="icon"></i>
        <i class="fa fa-retweet" class="icon"></i>
        <i class="fa fa-heart" class="icon"></i>
      </footer>
    </article>`;
    return $(html);

  }


  function renderTweets (tweets) {

    tweets.forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    })

  }


});
