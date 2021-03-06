import API from "./API.js";
import { postComment } from "./API.js";
import { updateLikes } from "./API.js";
import { updateRetweets } from "./API.js";

const tweetsContainer = document.querySelector(".tweet-container");
const userAvatarInput = document.querySelector(".input-file");

if (userAvatarInput) {
  userAvatarInput.addEventListener("change", (event) => {
    const fileList = event.target.files;
    console.log(fileList);

    const userAvatar = document.querySelector(".twitter-header__user-avatar");
    userAvatar.src = URL.createObjectURL(fileList[0]);
  });
}

const tweetLikes = () => {
  const likes = document.querySelectorAll(".like");
  likes.forEach((like) => {
    const likeCountEl = like.querySelector(".count");
    let likeCount = parseInt(likeCountEl.innerHTML);
    const tweetContainer =
      likeCountEl.parentNode.parentNode.parentNode.parentNode;
    const tweetId = tweetContainer.getAttribute("data-tweet-id");

    like.addEventListener("click", (event) => {
      event.preventDefault();
      like.classList.add("active");
      likeCount++;
      updateLikes(likeCount, tweetId);
      likeCountEl.innerHTML = likeCount;
    });
  });
};

const tweetRetweets = () => {
  const retweets = document.querySelectorAll(".retweet");
  retweets.forEach((retweet) => {
    const retweetCountEl = retweet.querySelector(".count");
    let retweetCount = parseInt(retweetCountEl.innerHTML);
    const tweetContainer =
      retweetCountEl.parentNode.parentNode.parentNode.parentNode;
    const tweetId = tweetContainer.getAttribute("data-tweet-id");

    retweet.addEventListener("click", (event) => {
      event.preventDefault();
      retweet.classList.add("active");
      retweetCount++;
      updateRetweets(retweetCount, tweetId);
      retweetCountEl.innerHTML = retweetCount;
    });
  });
};

const tweetComments = () => {
  const commentButtons = document.querySelectorAll("button.comment");
  commentButtons.forEach((commentButton) => {
    const commentCountEl = commentButton.querySelector(".count");
    let commentCount = parseInt(commentCountEl.innerHTML);
    const tweetContainer = commentButton.parentNode.parentNode.parentNode;
    const tweetId = tweetContainer.getAttribute("data-tweet-id");
    const commentForm = tweetContainer.querySelector(".comment-form");
    const commentFormTextarea = commentForm.querySelector(
      ".comment-form__textarea"
    );

    commentButton.addEventListener("click", (event) => {
      event.preventDefault();
      const commentBackButton = commentForm.querySelector(
        ".comment-form__back"
      );

      commentButton.classList.toggle("active");
      commentForm.classList.toggle("comment-form--hidden");

      commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (commentFormTextarea.value) {
          postComment(commentFormTextarea.value, tweetId);
          commentCount++;
          commentCountEl.innerHTML = commentCount;
        } else {
          console.log("commentFormTextarea is empty, cannot post comment");
        }
      });

      commentBackButton.addEventListener("click", (event) => {
        commentForm.classList.add("comment-form--hidden");
        commentButton.classList.remove("active");
      });
    });
  });
};

const renderTweets = (tweets) => {
  tweetsContainer.innerHTML = "";

  tweets.forEach((tweet) => {
    // console.log(tweet);

    const tweetItem = document.createElement("div");
    tweetItem.classList.add("tweet");
    tweetItem.setAttribute("data-tweet-id", `${tweet.id}`);
    tweetItem.innerHTML = `
      <header class="tweet__header">
        <strong class="name">${tweet.user.name}</strong>
        <p class="date">${tweet.date}</p>
      </header>
      <div class="tweet__body">
        <p>
          ${tweet.content}
        </p>
        <footer class="tweet__actions">
          <button class="like">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M16.675 0.958374C14.6146 0.961556 12.6844 1.9665 11.5 3.65238C10.3156 1.9665 8.38542 0.961556 6.325 0.958374C2.95548 0.958374 0 4.09336 0 7.66671C0 11.1493 1.96645 14.7361 5.68711 18.0397C7.41099 19.5674 9.30201 20.8955 11.3241 21.9988C11.4345 22.0557 11.5655 22.0557 11.6759 21.9988C13.6972 20.8955 15.5877 19.5673 17.311 18.0397C21.0335 14.7361 23 11.1493 23 7.66671C23 4.09336 20.0445 0.958374 16.675 0.958374V0.958374ZM11.5 21.2224C10.0921 20.4455 0.766667 15.0174 0.766667 7.66671C0.766667 4.50159 3.36371 1.72504 6.325 1.72504C8.33114 1.7286 10.1804 2.81084 11.1661 4.5583C11.2398 4.67098 11.3654 4.73874 11.5 4.73874C11.6346 4.73874 11.7602 4.67098 11.8339 4.5583C12.8196 2.81084 14.6689 1.7286 16.675 1.72504C19.6363 1.72504 22.2333 4.50159 22.2333 7.66671C22.2333 15.0174 12.9079 20.4455 11.5 21.2224Z"
                  fill="#909090"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="23" height="23" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span class="count">${tweet.likes}</span>
          </button>
          <button class="retweet">
            <svg
              width="23"
              height="15"
              viewBox="0 0 23 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 11.3473L19.4154 14.9263L15.8053 11.3312L17.0726 10.0586L18.5043 11.4844V2.78689C18.5059 2.54982 18.4146 2.32661 18.2474 2.15833C18.0786 1.9883 17.8531 1.89477 17.6127 1.89477H7.94415L6.14079 0.0987702H17.6127C18.3351 0.0987702 19.013 0.38076 19.5215 0.892449C20.0276 1.40203 20.304 2.07761 20.3001 2.79549V11.5051L21.731 10.0763L23 11.3473ZM14.7326 13.1194H5.38729C5.14671 13.1194 4.9214 13.0259 4.75259 12.8561C4.58537 12.6878 4.49412 12.4644 4.4957 12.2273V3.52985L5.92741 4.9556L7.19469 3.68305L3.58463 0.0878906L0 3.66708L1.26904 4.93787L2.69987 3.50932V12.2187C2.69601 12.9366 2.97239 13.6124 3.47846 14.1218C3.98699 14.6335 4.66486 14.9154 5.38729 14.9154H16.8592L15.0558 13.1194H14.7326Z"
                fill="#919191"
              />
            </svg>

            <span class="count">${tweet.retweets}</span>
          </button>
          <button class="comment">
            <svg
              width="23"
              height="25"
              viewBox="0 0 23 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M22.6631 13.4731C22.477 13.4731 22.3262 13.6371 22.3262 13.8393V18.7825C22.3262 19.0292 22.1416 19.2299 21.9147 19.2299H20.4164C20.1971 19.2299 20.0188 19.4237 20.0188 19.662V22.0134L16.4024 19.3057C16.3358 19.2561 16.258 19.2299 16.1773 19.2299H10.0236C9.79665 19.2299 9.61207 19.0292 9.61207 18.7825V15.8229H10.8992C11.0853 15.8229 11.2361 15.659 11.2361 15.4567C11.2361 15.2545 11.0853 15.0905 10.8992 15.0905H5.28447C5.21619 15.0905 5.14957 15.113 5.09338 15.1551L2.43912 17.1424V15.4567C2.43912 15.2545 2.28828 15.0905 2.10221 15.0905H1.08217C0.85702 15.0905 0.673828 14.8914 0.673828 14.6467V3.15906C0.673828 2.91433 0.85702 2.71521 1.08217 2.71521H3.38693C3.573 2.71521 3.72384 2.55125 3.72384 2.349C3.72384 2.14675 3.573 1.98279 3.38693 1.98279H1.08217C0.485471 1.98274 0 2.51042 0 3.15906V14.6467C0 15.2952 0.485471 15.8229 1.08217 15.8229H1.76525V17.8393C1.76525 17.9754 1.83465 18.1002 1.94543 18.1635C1.99467 18.1916 2.04848 18.2055 2.10212 18.2055C2.16919 18.2055 2.23599 18.1838 2.29326 18.1409L5.38923 15.8229H8.9382V18.7825C8.9382 19.433 9.42506 19.9623 10.0235 19.9623H16.0915L20.0697 22.9408C20.1374 22.9915 20.2161 23.0172 20.295 23.0172C20.3583 23.0172 20.4218 23.0007 20.4801 22.9674C20.6112 22.8925 20.6927 22.7459 20.6927 22.5849V19.9623H21.9147C22.5131 19.9623 23 19.4331 23 18.7825V13.8393C23 13.6371 22.8492 13.4731 22.6631 13.4731Z"
                  fill="#909090"
                />
                <path
                  d="M21.9146 9.86482H19.1962V3.15906C19.1962 2.51042 18.7107 1.98279 18.114 1.98279H4.96509C4.77902 1.98279 4.62817 2.14675 4.62817 2.349C4.62817 2.55125 4.77902 2.71521 4.96509 2.71521H18.114C18.3392 2.71521 18.5224 2.91433 18.5224 3.15906V14.6467C18.5224 14.8914 18.3392 15.0905 18.114 15.0905H12.4572C12.2711 15.0905 12.1203 15.2545 12.1203 15.4567C12.1203 15.659 12.2711 15.8229 12.4572 15.8229H18.114C18.7107 15.8229 19.1962 15.2952 19.1962 14.6467V10.5972H21.9147C22.1416 10.5972 22.3262 10.7979 22.3262 11.0446V12.1378C22.3262 12.3401 22.477 12.504 22.6631 12.504C22.8492 12.504 23 12.3401 23 12.1378V11.0446C23 10.394 22.5131 9.86482 21.9146 9.86482Z"
                  fill="#909090"
                />
                <path
                  d="M16.8623 4.16699H2.34021C2.15414 4.16699 2.0033 4.33096 2.0033 4.5332C2.0033 4.73545 2.15414 4.89941 2.34021 4.89941H16.8623C17.0484 4.89941 17.1992 4.73545 17.1992 4.5332C17.1992 4.33096 17.0484 4.16699 16.8623 4.16699Z"
                  fill="#909090"
                />
                <path
                  d="M16.8622 8.54968H14.5615C14.3754 8.54968 14.2245 8.71365 14.2245 8.91589C14.2245 9.11814 14.3754 9.2821 14.5615 9.2821H16.8622C17.0483 9.2821 17.1991 9.11814 17.1991 8.91589C17.1991 8.71365 17.0483 8.54968 16.8622 8.54968Z"
                  fill="#909090"
                />
                <path
                  d="M2.34021 8.54968C2.15414 8.54968 2.0033 8.71365 2.0033 8.91589C2.0033 9.11814 2.15414 9.2821 2.34021 9.2821H13.0019C13.188 9.2821 13.3388 9.11814 13.3388 8.91589C13.3388 8.71365 13.188 8.54968 13.0019 8.54968H2.34021Z"
                  fill="#909090"
                />
                <path
                  d="M2.34021 12.9116C2.15414 12.9116 2.0033 13.0756 2.0033 13.2778C2.0033 13.4801 2.15414 13.644 2.34021 13.644H4.64093C4.82699 13.644 4.97784 13.4801 4.97784 13.2778C4.97784 13.0756 4.82699 12.9116 4.64093 12.9116H2.34021Z"
                  fill="#909090"
                />
                <path
                  d="M16.8623 12.9116H6.20056C6.0145 12.9116 5.86365 13.0756 5.86365 13.2778C5.86365 13.4801 6.0145 13.644 6.20056 13.644H16.8623C17.0484 13.644 17.1992 13.4801 17.1992 13.2778C17.1992 13.0756 17.0484 12.9116 16.8623 12.9116Z"
                  fill="#909090"
                />
                <path
                  d="M16.8623 10.7144H2.34021C2.15414 10.7144 2.0033 10.8783 2.0033 11.0806C2.0033 11.2828 2.15414 11.4468 2.34021 11.4468H16.8623C17.0484 11.4468 17.1992 11.2828 17.1992 11.0806C17.1992 10.8783 17.0484 10.7144 16.8623 10.7144Z"
                  fill="#909090"
                />
                <path
                  d="M15.8499 6.74011C15.8499 6.53787 15.6991 6.3739 15.513 6.3739H2.33856C2.1525 6.3739 2.00165 6.53787 2.00165 6.74011C2.00165 6.94236 2.1525 7.10632 2.33856 7.10632H15.513C15.6991 7.10632 15.8499 6.94236 15.8499 6.74011Z"
                  fill="#909090"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="23" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span class="count">${tweet.comments.length}</span>
          </button>
        </footer>
        <form class="comment-form  comment-form--hidden" action="">
          <textarea
            class="comment-form__textarea"
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Your comment"
          ></textarea>
          <div class="comment-form__actions">
            <input
              class="comment-form__submit"
              type="submit"
              value="Tweet"
            />
            <a class="comment-form__back" href="#">
              <svg
                width="22"
                height="8"
                viewBox="0 0 22 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.646446 3.64645C0.451185 3.84171 0.451185 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM22 3.5L1 3.5V4.5L22 4.5V3.5Z"
                  fill="#FAFF00"
                />
              </svg>
            </a>
          </div>
        </form>
      </div>`;
    tweetsContainer.append(tweetItem);
  });

  tweetLikes();
  tweetRetweets();
  tweetComments();
};

API.getTweets().then((tweets) => {
  renderTweets(tweets);
});
