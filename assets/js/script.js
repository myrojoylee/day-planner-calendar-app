$(function () {
  // =================================================
  // Day and month arrays
  // =================================================
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthsOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // =================================================
  // IDs with their respective times
  // =================================================
  let timeSlot = [
    { id: "#hour-9", hour: 9 },
    { id: "#hour-10", hour: 10 },
    { id: "#hour-11", hour: 11 },
    { id: "#hour-12", hour: 12 },
    { id: "#hour-13", hour: 13 },
    { id: "#hour-14", hour: 14 },
    { id: "#hour-15", hour: 15 },
    { id: "#hour-16", hour: 16 },
    { id: "#hour-17", hour: 17 },
  ];

  let retrieveUserEntry = [];

  // =================================================
  // Time and date variables
  // =================================================
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = monthsOfTheYear[currentDate.getMonth()];
  let currentDayOfMonth = currentDate.getDate();
  let currentDayName = daysOfTheWeek[currentDate.getDay()];
  let currentHour = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  let currentDateInWords = `${currentMonth} ${currentDayOfMonth}, ${currentYear}`;

  // =================================================
  // Info in storage appears on reload, if applicable
  // =================================================

  if (localStorage.getItem("day-planner-events") !== null) {
    retrieveUserEntry = JSON.parse(localStorage.getItem("day-planner-events"));

    localStorage.setItem(
      "day-planner-events",
      JSON.stringify(retrieveUserEntry)
    );

    // only display events from the current day
    $.each(retrieveUserEntry, function (key, value) {
      if (value.day === currentDateInWords) {
        let entryHourId = `#${value.hour}`;
        $(entryHourId).find("textarea").text(value.event);
      }
    });
  }

  // =================================================
  // writing current date at the top of page
  // =================================================
  if (currentDayOfMonth > 3 && currentDayOfMonth != 23) {
    $("#currentDay").text(
      `${currentDayName}, ${currentMonth} ${currentDayOfMonth}th, ${currentYear}`
    );
  } else if (
    (currentDayOfMonth = 1) ||
    (currentDayOfMonth = 21) ||
    (currentDayOfMonth = 31)
  ) {
    $("#currentDay").text(
      `${currentDayName}, ${currentMonth} ${currentDayOfMonth}st`
    );
  } else if ((currentDayOfMonth = 2) || (currentDayOfMonth = 22)) {
    $("#currentDay").text(
      `${currentDayName}, ${currentMonth} ${currentDayOfMonth}nd`
    );
  } else {
    $("#currentDay").text(
      `${currentDayName}, ${currentMonth} ${currentDayOfMonth}rd`
    );
  }

  // =================================================
  // Class assignment based on time to assign color
  // =================================================
  $.each(timeSlot, function (key, value) {
    let idHour = value.id;

    if (value.hour < currentHour) {
      $(idHour).removeClass("future");
      $(idHour).removeClass("present");
      $(idHour).addClass("past");
    } else if (value.hour == currentHour) {
      $(idHour).removeClass("future");
      $(idHour).removeClass("past");
      $(idHour).addClass("present");
    } else {
      $(idHour).removeClass("present");
      $(idHour).removeClass("past");
      $(idHour).addClass("future");
    }
  });

  // =================================================
  // Data handling after save icon is clicked
  // =================================================
  $(".saveBtn").click(function () {
    let parentEl = $(this).parent().attr("id");
    let parentElId = `#${parentEl}`;
    let textField = $(parentElId).find("textarea").val();
    let userEntry = {
      day: currentDateInWords,
      hour: parentEl,
      event: textField,
    };

    // retrieve existing data if it exists
    if (localStorage.getItem("day-planner-events") !== null) {
      retrieveUserEntry = JSON.parse(
        localStorage.getItem("day-planner-events")
      );
      retrieveUserEntry.push(userEntry);
      localStorage.setItem(
        "day-planner-events",
        JSON.stringify(retrieveUserEntry)
      );

      // only display events from the current day
      $.each(retrieveUserEntry, function (key, value) {
        if (value.day === currentDateInWords) {
          let entryHourId = `#${value.hour}`;
          $(entryHourId).find("textarea").text(value.event);
        }
      });
    }
    // if nothing in local storage, set item in storage.
    else {
      retrieveUserEntry.push(userEntry);
      localStorage.setItem(
        "day-planner-events",
        JSON.stringify(retrieveUserEntry)
      );
    }
  });
});

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// ====================
// DONE
// TODO: Add code to display the current date in the header of the page.
// ====================
// DONE
// TODO: Add a listener for click events on the save button.
// ====================
// DONE
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
// ====================
// Done:
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
// ====================
// Done:
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
// ====================
// Done:
// Items logged to the same time should all appear
// but on next line
// ====================
// Done:
// Data should persist (and appear! ) on refresh
// ====================
// TO DO:
// Alert appears at top when event has been stored
