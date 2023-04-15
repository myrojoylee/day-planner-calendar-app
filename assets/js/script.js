$(function () {
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
  // Time and date variables using dayjs
  // =================================================
  let currentYear = dayjs().$y;
  let currentMonth = dayjs().format("MMMM");
  let currentDayOfMonth = dayjs().$D;
  let currentDayName = dayjs().format("dddd");
  let currentHour = dayjs().format("HH");
  let todaysDate = dayjs().format("dddd, MMMM D, YYYY");

  // =================================================
  // Info in storage appears on reload, if applicable
  // =================================================

  if (localStorage.getItem("day-planner-events") !== null) {
    retrieveUserEntry = JSON.parse(localStorage.getItem("day-planner-events"));

    localStorage.setItem(
      "day-planner-events",
      JSON.stringify(retrieveUserEntry)
    );

    $.each(retrieveUserEntry, function (key, value) {
      if (value.day === todaysDate) {
        let entryHourId = `#${value.hour}`;
        $(entryHourId).find("textarea").text(value.event);
      }
    });
  }

  // =================================================
  // writing current date at the top of page
  // =================================================
  $("#currentDay").text(`${todaysDate}`);

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
      day: todaysDate,
      hour: parentEl,
      event: textField,
    };

    let entryHourId;

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
        if (value.day === todaysDate) {
          entryHourId = `#${value.hour}`;
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
