$(document).ready(function () {
  // Attach an input event listener to the textarea
  $("#tweet-text").on("input", function () {
    // Get the current character count
    let charCount = $(this).val().length;

    // Update the counter
    let counterElement = $(".counter");
    counterElement.text(140 - charCount);

    // Change text color to red if counter is negative
    if (charCount > 140) {
      counterElement.addClass("negative");
    } else {
      counterElement.removeClass("negative");
    }
  });
});
