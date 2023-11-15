const addShiftButtonButton = document.getElementById("addShiftButton");
const progressContainer = document.getElementById("progress-container");

addShiftButton.addEventListener("click", () => {
  addShiftButtonButton.disabled = true;
  progressContainer.style.display = "block";

  simulateSaveOperation(() => {
    addShiftButton.disabled = false;
    progressContainer.style.display = "none";
  });
});

function simulateSaveOperation(callback) {
  setTimeout(() => {
    callback();

    saveDataToLocalStorage();
  }, 3000);
}

function saveDataToLocalStorage() {
  const data = "Your data here";
  localStorage.setItem("savedData", data);
}
