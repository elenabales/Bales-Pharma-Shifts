document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-button")) {
    const shiftId = event.target.getAttribute("data-shift-id");
    const shiftToEdit = findShiftById(shiftId);

    if (shiftToEdit) {
      openEditModal(shiftToEdit);
    }
  }
});

function findShiftById(shiftId) {
  const existingShifts =
    JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
  return existingShifts.find((shift) => shift.id === shiftId);
}

function openEditModal(shiftData) {
  const editShiftModal = document.getElementById("editShiftModal");
  editShiftModal.style.display = "block";

  document.getElementById("editShiftDate").value = shiftData.shiftDate;
  document.getElementById("editStartTime").value = shiftData.startTime;
  document.getElementById("editEndTime").value = shiftData.endTime;
  document.getElementById("editHourlyWage").value = shiftData.hourlyWage;
  document.getElementById("editWorkplace").value = shiftData.workplace;
  document.getElementById("editShiftName").value = shiftData.shiftName;
  document.getElementById("editComments").value = shiftData.comments;

  // Save the shift ID for later use when saving changes
  document
    .getElementById("saveEditButton")
    .setAttribute("data-shift-id", shiftData.id);
}
document
  .getElementById("saveEditButton")
  .addEventListener("click", function () {
    // Get the shift ID from the button's data attribute
    const shiftId = document
      .getElementById("saveEditButton")
      .getAttribute("data-shift-id");
    const shiftToEdit = findShiftById(shiftId);

    if (shiftToEdit) {
      shiftToEdit.shiftDate = document.getElementById("editShiftDate").value;
      shiftToEdit.startTime = document.getElementById("editStartTime").value;
      shiftToEdit.endTime = document.getElementById("editEndTime").value;
      shiftToEdit.hourlyWage = parseFloat(
        document.getElementById("editHourlyWage").value
      );
      shiftToEdit.workplace = document.getElementById("editWorkplace").value;
      shiftToEdit.shiftName = document.getElementById("editShiftName").value;
      shiftToEdit.comments = document.getElementById("editComments").value;

      const existingShifts =
        JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
      const updatedShifts = existingShifts.map((shift) =>
        shift.id === shiftId ? shiftToEdit : shift
      );
      localStorage.setItem(
        loggedInUser.username,
        JSON.stringify(updatedShifts)
      );

      document.getElementById("editShiftModal").style.display = "none";

      loadShiftData();
    }
  });
