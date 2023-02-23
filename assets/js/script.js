// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDayElem = $('#currentDay');
// var dailyPlannerElem = $('#daily-planner');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

//display current state of planner
function displayPlanner (plannerEntries) {
  const workHoursArray = ["hour-9", "hour-10","hour-11","hour-12","hour-13","hour-14","hour-15","hour-16","hour-17"];
  $.each(workHoursArray, function(index, hour) {
    var curPlannerElem = $("#"+`${hour}`);
    // var curHour =  dayjs().format('H');
    var curHour = 12;
    console.log("at", `${index}`, "the id is", "#"+`${hour}`);
    console.log("the hour is", curHour);
    if ((curHour-9) < `${index}`) {
      console.log("hasn't happened yet");
      curPlannerElem.removeClass();
      curPlannerElem.addClass('row time-block past');
    } else if ((curHour-9) == `${index}`) {
      console.log("happening now");
      curPlannerElem.removeClass();
      curPlannerElem.addClass('row time-block present');
    } else {
      console.log ("happening in future");
      curPlannerElem.removeClass();
      curPlannerElem.addClass('row time-block future');
    }
    //if plannerEntries has content for this hour, load into textarea
  });
}

//load planner entries
function loadPlannerEntries () {
  var dailyPlanner = localStorage.getItem('daily-planner');
  if (dailyPlanner) {
    dailyPlanner = JSON.parse(dailyPlanner);
  }
  else {
    dailyPlanner = [];
    console.log("nothing in localStorage for daily-planner");
  }
  return dailyPlanner;
}

function init () {
  //do stuff
  console.log("inside init");
  //set current day
  // const advancedFormat = require('dayjs/plugin/advancedFormat');
  // dayjs.extend(advancedFormat);
  let currentTime = dayjs().format('dddd, MMMM Do');
  console.log(currentTime);
  currentDayElem.text(currentTime);

  //load entries and return daily planner
  var plannerEntries = loadPlannerEntries ();
  displayPlanner(plannerEntries);

}

init ();