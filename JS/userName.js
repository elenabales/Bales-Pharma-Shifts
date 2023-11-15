const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser && loggedInUser.username) {
  const usernameElement = document.getElementById("username");
  usernameElement.textContent = `Hello, ${loggedInUser.username}! `;
  usernameElement.style.color = "#12f11a";
} else {
  window.location.href = "Login.html";
}
