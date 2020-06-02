import API from "./API.js";
import { postTweet } from "./API.js";

const tweetForm = document.querySelector(".create-tweet-form");
const tweetTextarea = tweetForm.querySelector(".create-tweet-textarea");

if (tweetForm) {
  tweetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(tweetTextarea.value);
    postTweet(tweetTextarea.value);
  });
}
