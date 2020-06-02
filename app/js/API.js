const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users?_embed=tweets`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = () => fetch(TWEETS_URL).then((res) => res.json());
const getUsers = () => fetch(USERS_URL).then((res) => res.json());

export default {
  getTweets,
  getUsers,
};

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}
today = `${mm}/${dd}/${yyyy}`;

const currentUser = JSON.parse(localStorage.getItem("user"));

export const postTweet = async (tweet) => {
  console.log("postTweet");
  if (currentUser === null) {
    console.log(
      "Error: no currentuser set, cannot post tweet. Exit postTweet function"
    );
    return;
  }

  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: parseInt(currentUser.id),
      content: `${tweet}`,
      date: `${today}`,
      likes: 0,
      retweets: 0,
    }),
  };
  return await fetch(`${API_ENDPOINT}/tweets`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Oops something went wrong!";
      }
    })
    .catch((error) => error);
};

export const postComment = async (comment, tweetId) => {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId: parseInt(currentUser.id),
      content: `${comment}`,
      date: `${today}`,
      tweetId: parseInt(tweetId),
    }),
  };

  await fetch(`${API_ENDPOINT}/comments`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Oops something went wrong!";
      }
    })
    .catch((error) => error);
};

export const updateLikes = async (likes, tweetId) => {
  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: parseInt(tweetId),
      likes: parseInt(likes),
    }),
  };

  await fetch(`${API_ENDPOINT}/tweets/${tweetId}/`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Oops something went wrong!";
      }
    })
    .catch((error) => error);
};

export const updateRetweets = async (retweets, tweetId) => {
  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: parseInt(tweetId),
      retweets: parseInt(retweets),
    }),
  };

  await fetch(`${API_ENDPOINT}/tweets/${tweetId}`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Oops something went wrong!";
      }
    })
    .catch((error) => error);
};
