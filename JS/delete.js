document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    const shiftId = event.target.getAttribute("data-shift-id");
    const shiftToDelete = findShiftById(shiftId);

    if (shiftToDelete) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this shift?"
      );

      if (confirmDelete) {
        const existingShifts =
          JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
        const updatedShifts = existingShifts.filter(
          (shift) => shift.id !== shiftId
        );
        localStorage.setItem(
          loggedInUser.username,
          JSON.stringify(updatedShifts)
        );

        event.target.closest("tr").remove();

        calculateMonthlyProfits();
      }
    }
  }
});
