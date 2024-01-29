$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweets) {
    // Clear existing tweets in the container
    $("#tweets-container").empty();

    // Loop through tweets
    tweets.forEach((tweet) => {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    });
  };

  const createTweetElement = function (tweet) {
    // ... your createTweetElement code
    let $tweet = $(`<article class="tweet">
    <header>
     <div id="user">
        <img src=${tweet.user.avatars} alt="user avatar">
        <p id="user-name">${tweet.user.name}</p>
      </div>
      <p id="user-ig"><b>${tweet.user.handle}</b></p>
    </header>
    <p id="comment">${tweet.content.text}</p>
    <footer>
      <span>${tweet.created_at}</span>
      <div id="comment-btn">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  // Call renderTweets with your data
  renderTweets(data);
});
