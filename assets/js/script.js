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
    let toggleTextArea;

    if (value.hour < currentHour) {
      $(idHour).removeClass("future");
      $(idHour).removeClass("present");
      $(idHour).addClass("past");
      $(idHour).find("textarea").attr("disabled", "disabled");
      $(idHour).find("button").attr("disabled", "disabled");
    } else if (value.hour == currentHour) {
      $(idHour).removeClass("future");
      $(idHour).removeClass("past");
      $(idHour).addClass("present");
      $(idHour).find("textarea").removeAttr("disabled");
      $(idHour).find("button").removeAttr("disabled");
    } else {
      $(idHour).removeClass("present");
      $(idHour).removeClass("past");
      $(idHour).addClass("future");
      $(idHour).find("textarea").removeAttr("disabled");
      $(idHour).find("button").removeAttr("disabled");
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

    // confirmation message appears briefly above
    let confirmationMessage = $("#confirmationMessage");
    let storageMessage = $(".storage-message");

    confirmationMessage.css("color", "black");
    storageMessage.css("color", "red");

    setTimeout(function () {
      confirmationMessage.css("color", "transparent");
      storageMessage.css("color", "transparent");
    }, 2000);
  });
});
