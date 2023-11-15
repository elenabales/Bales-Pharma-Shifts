function signUp() {
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let age = document.getElementById("age").value;

  if (!validateEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (username.length < 6) {
    alert("Username should be at least 6 characters long.");
    return;
  }

  if (password.length < 6) {
    alert("Password should be at least 6 characters long.");
    return;
  }

  if (!validatePasswordComplexity(password)) {
    alert(
      "Password must contain letters, numbers, and at least one special character."
    );
    return;
  }

  if (firstName.length < 2) {
    alert("First name should include at least 2 letters.");
    return;
  }

  if (lastName.length < 2) {
    alert("Last name should include at least 2 letters.");
    return;
  }

  if (age < 18 || age > 65) {
    alert("Age should be between 18 and 65.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((user) => user.username === username)) {
    alert("Username already exists. Please choose a different one.");
    return;
  }

  users.push({ email, username, password, firstName, lastName, age });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful");

  window.location.href = "./Login.html";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePasswordComplexity(password) {
  return (
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^a-zA-Z\d]/.test(password)
  );
}
