import API from "./API.js";
// Your code here

/**
 * Generate an alert component based on the passed state key
 * @param  {String} state must be 'error' or 'success'
 * @return {String} A HTML string of the component output
 */
const renderAlert = (state = "error") => {
  const iconPaths = {
    error:
      "M11.148 4.374a.973.973 0 01.334-.332c.236-.143.506-.178.756-.116s.474.216.614.448l8.466 14.133a.994.994 0 01-.155 1.192.99.99 0 01-.693.301H3.533a.997.997 0 01-.855-1.486zM9.432 3.346l-8.47 14.14c-.422.731-.506 1.55-.308 2.29s.68 1.408 1.398 1.822c.464.268.976.4 1.475.402H20.47a3 3 0 002.572-4.507L14.568 3.346a2.995 2.995 0 00-4.123-1.014c-.429.26-.775.615-1.012 1.014zM11 9v4a1 1 0 002 0V9a1 1 0 00-2 0zm2 8a1 1 0 10-2 0 1 1 0 002 0z",
    success:
      "M19.293 5.293L9 15.586l-4.293-4.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l11-11a.999.999 0 10-1.414-1.414z",
  };

  const messages = {
    error: "<strong>Error, username or password does not match!</strong>",
    success: "<strong>Success! Logging you in...</strong>",
  };

  return `
    <figure class="alert" data-state="${state}">
      <svg class="alert__icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor" d="${iconPaths[state]}"/>
      </svg>
      <p class="alert__content">${messages[state]}</p>
    </figure>
    `;
};
const loginForm = document.querySelector("#login");
const alertElement = document.querySelector('[role="alert"]');

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = loginForm.querySelector(".username");
    let match = false;

    API.getUsers().then((users) => {
      users.forEach((user) => {
        if (username.value === user.name) {
          alertElement.innerHTML = renderAlert("success");
          match = true;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            window.location.replace("home.html");
          }, 300);
        }
      });
    });

    if (match === true) {
      alertElement.innerHTML = renderAlert("success");
    } else {
      alertElement.innerHTML = renderAlert("error");
    }
  });
}
