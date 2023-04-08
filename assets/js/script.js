$(function () {
  // declaring our day and month arrays
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

  // ids with their respective times
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

  // variables to display and compare time
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = monthsOfTheYear[currentDate.getMonth()];
  let currentDayOfMonth = currentDate.getDate();
  let currentDayName = daysOfTheWeek[currentDate.getDay()];
  let currentHour = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  let currentDateInWords = `${currentMonth} ${currentDayOfMonth}, ${currentYear}`;

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

  //

  // class assignment based on time to assign color
  $.each(timeSlot, function (key, value) {
    let plannerHour = value.hour;
    if (value.hour < currentHour) {
      if (currentMinutes > 0) {
        let idHour = value.id;

        $(idHour).removeClass("future");
        $(idHour).removeClass("present");
        $(idHour).addClass("past");
      }
    } else if ((value.hour = currentHour)) {
      $(idHour).removeClass("future");
      $(idHour).removeClass("past");
      $(idHour).addClass("present");
    } else {
      $(idHour).removeClass("present");
      $(idHour).removeClass("past");
      $(idHour).addClass("future");
    }
  });

  $(".saveBtn").click(function () {
    // let userEntry = $(idHour, textarea).val();
    // console.log(userEntry);
    // let parentEl = $(this).parent().attr("id");
    let parentEl = $(this).parent().attr("id");
    let parentElId = `#${parentEl}`;
    let textField = $(parentElId).find("textarea").val();
    let userEntry = {
      day: currentDateInWords,
      hour: parentEl,
      event: textField,
    };

    localStorage.setItem("day-planner-events", JSON.stringify(userEntry));
    // let userEntry = $(parentEl).text();
    // console.log(userEntry);
  });

  // $("input[type=text], textArea").text("hi friends");
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

// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
