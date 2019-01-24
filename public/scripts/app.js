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
      url: "/tweets",
      data: $form.serialize()
    })
      .done(function() {
        alert(data);
      });
  });





  function loadTweets () {
    const $form = $('form');
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
    console.log($(html))
    return $(html);

  }


  function renderTweets (tweets) {

    tweets.forEach(function(tweet) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    })

  }



});
