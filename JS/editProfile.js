function validatePasswordComplexity(password) {
  const letterPattern = /[a-zA-Z]/;
  const numberPattern = /[0-9]/;
  const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  return (
    letterPattern.test(password) &&
    numberPattern.test(password) &&
    specialCharPattern.test(password)
  );
}

function getUserData() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return currentUser;
}

function populateForm(userData) {
  document.getElementById("email").value = userData.email;
  document.getElementById("username").value = userData.username;
  document.getElementById("password").value = userData.password;
  document.getElementById("firstName").value = userData.firstName;
  document.getElementById("lastName").value = userData.lastName;
  document.getElementById("age").value = userData.age;
}

function updateUserData(updatedUserData) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const index = users.findIndex(
    (user) => user.username === currentUser.username
  );

  if (index !== -1) {
    users[index] = updatedUserData;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUserData));

    alert("Profile updated successfully!");

    window.location.href = "shiftsHomePage.html";
  } else {
    alert("User not found in local storage.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const userData = getUserData();
  if (userData) {
    populateForm(userData);
  } else {
    alert("User data not found in local storage.");
  }

  document
    .getElementById("profileForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const updatedUserData = {
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
      };

      if (!validatePasswordComplexity(updatedUserData.password)) {
        alert(
          "Password must contain letters, numbers, and at least one special character."
        );
        return;
      }

      updateUserData(updatedUserData);
    });
});
