function signIn() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert("Login successful");
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Set a timeout to clear the user session after 60 minutes
    setTimeout(function () {
      localStorage.removeItem("loggedInUser");
    }, 60 * 60 * 1000); 

    window.location.href = "shiftsHomePage.html";
  } else {
    alert("Incorrect login credentials");
  }
}
