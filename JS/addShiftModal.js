document
  .getElementById("add-shift-button")
  .addEventListener("click", function () {
    document.getElementById("shiftModal").style.display = "block";
    document.getElementById("progress-container").style.display = "block";
  });

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("shiftModal").style.display = "none";
});

document
  .getElementById("addShiftButton")
  .addEventListener("click", function () {
    const shiftDate = document.getElementById("shiftDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const hourlyWage = parseFloat(document.getElementById("hourlyWage").value);
    const workplace = document.getElementById("workplace").value;
    const shiftName = document.getElementById("shiftName").value;
    const comments = document.getElementById("comments").value;

    if (
      !shiftDate ||
      !startTime ||
      !endTime ||
      isNaN(hourlyWage) ||
      !workplace ||
      !shiftName
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const existingShifts =
      JSON.parse(localStorage.getItem(loggedInUser.username)) || [];

    const shiftNameExists = existingShifts.some(
      (shift) => shift.shiftName === shiftName
    );

    if (shiftNameExists) {
      alert("Shift name already exists. Please choose a different name.");
      return;
    }

    const newShift = {
      id: generateUniqueId(),
      shiftDate,
      startTime,
      endTime,
      hourlyWage,
      workplace,
      shiftName,
      comments,
    };

    existingShifts.push(newShift);
    localStorage.setItem(loggedInUser.username, JSON.stringify(existingShifts));

    document.getElementById("shiftModal").style.display = "none";

    loadShiftData();
  });

// generate unique ID for shifts
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
