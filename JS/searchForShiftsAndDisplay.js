document.getElementById("search-button").addEventListener("click", function () {
  const shiftInput = document.getElementById("shift-input").value.toLowerCase();
  const fromDate = document.getElementById("from-date-input").value;
  const toDate = document.getElementById("to-date-input").value;

  const existingShifts =
    JSON.parse(localStorage.getItem(loggedInUser.username)) || [];

  const filteredShifts = existingShifts.filter((shiftData) => {
    const shiftName = shiftData.shiftName.toLowerCase();
    const shiftDate = shiftData.shiftDate;

    return (
      shiftName.includes(shiftInput) &&
      (!fromDate || shiftDate >= fromDate) &&
      (!toDate || shiftDate <= toDate)
    );
  });

  displayFilteredShifts(filteredShifts);
});

function displayFilteredShifts(filteredShifts) {
  const shiftTableBody = document.getElementById("shiftTableBody");
  shiftTableBody.innerHTML = "";

  filteredShifts.forEach((shiftData) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${shiftData.shiftDate}</td>
            <td>${shiftData.startTime}</td>
            <td>${shiftData.endTime}</td>
            <td>${shiftData.hourlyWage}</td>
            <td>${shiftData.workplace}</td>
            <td></td>
            <td><button class="edit-button" data-shift-id="${shiftData.id}">Edit</button></td>
            <td><button class="delete-button" data-shift-id="${shiftData.id}">Delete</button></td> 
        `;

    const start = new Date(`${shiftData.shiftDate} ${shiftData.startTime}`);
    const end = new Date(`${shiftData.shiftDate} ${shiftData.endTime}`);
    // Check if the end time is before the start time (crossing midnight)
    if (end < start) {
      // Add 1 day to the end time to account for crossing midnight
      end.setDate(end.getDate() + 1);
    }

    const hoursWorked = (end - start) / (1000 * 60 * 60);
    const profit = (hoursWorked * shiftData.hourlyWage).toFixed(2);
    newRow.cells[5].textContent = `$${profit}`;

    shiftTableBody.appendChild(newRow);
  });

  calculateMonthlyProfits();
}

function calculateMonthlyProfits() {
  const rows = document.querySelectorAll("tbody tr");
  const monthlyProfits = {};

  rows.forEach((row) => {
    const date = new Date(row.cells[0].textContent);
    const month = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const profit = parseFloat(row.cells[5].textContent.replace("$", ""));

    if (monthlyProfits[month]) {
      monthlyProfits[month] += profit;
    } else {
      monthlyProfits[month] = profit;
    }
  });

  let bestMonth = "";
  let bestProfit = 0;

  for (const month in monthlyProfits) {
    if (monthlyProfits[month] > bestProfit) {
      bestMonth = month;
      bestProfit = monthlyProfits[month];
    }
  }

  const bestMonthName = document.getElementById("bestMonthName");
  const bestMonthProfit = document.getElementById("bestMonthProfit");

  bestMonthName.textContent = bestMonth;
  bestMonthProfit.textContent = `$${bestProfit.toFixed(2)}`;
}

function loadShiftData() {
  const existingShifts =
    JSON.parse(localStorage.getItem(loggedInUser.username)) || [];

  const shiftTableBody = document.getElementById("shiftTableBody");
  shiftTableBody.innerHTML = "";

  existingShifts.forEach((shiftData) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${shiftData.shiftDate}</td>
            <td>${shiftData.startTime}</td>
            <td>${shiftData.endTime}</td>
            <td>${shiftData.hourlyWage}</td>
            <td>${shiftData.workplace}</td>
            <td></td>
            <td><button class="edit-button" data-shift-id="${shiftData.id}">Edit</button></td>
            <td><button class="delete-button" data-shift-id="${shiftData.id}">Delete</button></td> 
        `;

    const startDate = new Date(`${shiftData.shiftDate} ${shiftData.startTime}`);
    const endDate = new Date(`${shiftData.shiftDate} ${shiftData.endTime}`);

    // Check if the shift spans across two different days
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1); // Add one day to the end date
    }

    // Calculate the hours worked in decimal format
    const hoursWorked = (endDate - startDate) / (1000 * 60 * 60);

    const profit = (hoursWorked * shiftData.hourlyWage).toFixed(2);

    newRow.cells[5].textContent = `$${profit}`;

    shiftTableBody.appendChild(newRow);
  });

  calculateMonthlyProfits();
}

loadShiftData();
