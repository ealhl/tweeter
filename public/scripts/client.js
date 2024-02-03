$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function (tweets) {
    // Clear existing tweets in the container
    $("#tweets-container").empty();

    // Loop through tweets
    tweets.forEach((tweet) => {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    });
  };

  const createTweetElement = function (tweet) {
    // ... your createTweetElement code
    const formattedTimestamp = timeago.format(tweet.created_at);

    let $tweet = $(`<article class="tweet">
    <header>
     <div class="user">
        <img src=${tweet.user.avatars} alt="user avatar">
        <p class="user-name">${tweet.user.name}</p>
      </div>
      <p class="user-ig"><b>${tweet.user.handle}</b></p>
    </header>
    <p class="comment">${escape(tweet.content.text)}</p>
    <footer>
    <span class="time-ago">${formattedTimestamp}</span>
      <div class="comment-btn">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  const loadTweets = function () {
    $.get("/tweets")
      .done(function (tweets) {
        console.log("GET request successful", tweets);
        renderTweets(tweets);
      })
      .fail(function (error) {
        console.error("Error loading tweets", error);
      });
  };

  //Validate tweet content before submitting
  //Check if the tweet content is empty or too long
  const validateTweet = function (tweetText) {
    console.log("tweetText", tweetText);
    console.log("tweetText.length", tweetText.length);
    const maxLength = 145;

    if (!tweetText || tweetText.length === 5 || tweetText.length < 5) {
      return { error: true, message: "Tweet content is empty." };
    }

    if (tweetText.length > maxLength) {
      return { error: true, message: "Tweet content is too long." };
    }

    return { error: false, message: "" };
  };

  $("form").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    const validationResult = validateTweet(data);

    // Get the error message container
    const $errorMessageContainer = $(".error-message");

    if (validationResult.error) {
      $errorMessageContainer.text(validationResult.message);
      $errorMessageContainer.slideDown();
      return; // Stop further execution
    }

    $errorMessageContainer.empty().slideUp();

    $.post("/tweets", data)
      .done(function (response) {
        // Handle the success response from the server
        console.log("POST request successful", response);
        loadTweets();
        $("#tweet-text").val("");
        $("#counter").val("140");
      })
      .fail(function (error) {
        // Handle errors during the POST request
        console.error("Error submitting POST request", error);
      });
  });

  // Call renderTweets initially with your existing tweet data
  loadTweets();
});
