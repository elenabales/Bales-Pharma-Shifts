function resetAll() {
  localStorage.removeItem("users");
  localStorage.removeItem("loggedInUser");

  alert("All user data has been reset.");
}
