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
    const messageLengthError = $("<p>").addClass("error");

    $('.error').remove();

    if (tweetMessage === "") {

      messageLengthError.text("Cannot post an empty tweet.");
      $form.append(messageLengthError);

    } else if (tweetMessage.length > 140) {

      messageLengthError.text("The maximum tweet length is 140 characters.")
      $form.append(messageLengthError);

    } else {

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
      console.err('hello?')
    })
  }

  loadTweets();


  function createTweetElement (data) {

    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const html = `<article class="tweet">
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
