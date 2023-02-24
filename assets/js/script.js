// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

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

var currentDayElem = $('#currentDay');
// var dailyPlannerElem = $('#daily-planner');

var tmpActivitiesArray = [
  {"time": 9, "desc": "do dishes"},
  {"time": 9, "desc": "clean mat"},
  {"time": 10, "desc": "free time"},
  {"time": 11, "desc": "go to bed"},
];

//save the current textarea, replacing the old
$(document).on('click', '.saveBtn', function () {
  // this.preventDefault(); //maybe
  var curHour = $(this).parent().attr("id");
  console.log("pre-slice parent is:", curHour);
  curHour = curHour.slice(5); // removing leading "hour-"
  console.log("post-slice parent is:", curHour);
  var curNumHour = +curHour; //convert string to number

  var curTextArea = $(this).prev(".description").val().trim();
  console.log("textarea says:\n"+ curTextArea);
  //load current act array
  var actArray = loadPlanner();
  //remove previous entry for this hour from array
  $.each(actArray, function(index, activity) {
    if (activity.time === curNumHour) {
      var tmpRemoved = actArray.splice(index);
      console.log("we removed", tmpRemoved);
    }
  });
  //create new object
  var newActObj = {"time": curNumHour,"desc": curTextArea};
  console.log("new object is:", newActObj);
  //push new hour object onto activity array
  actArray.push(newActObj);
  
  //save planner array to localStorage
  localStorage.setItem("daily-planner", JSON.stringify(actArray));
  // savePlanner(actArray); 
});


// //save planner array to localStorage
// function savePlanner (actArray) {
//   localStorage.setItem("daily-planner", JSON.stringify(actArray));
// }

//colorize the planner
function colorizePlanner () {
  //set work hours
  const workHoursArray = ["hour-9", "hour-10","hour-11","hour-12",
  "hour-13","hour-14","hour-15","hour-16","hour-17"]; 

  $.each(workHoursArray, function(index, hour) {
    let curPlannerElem = $("#"+`${hour}`);
    var curHour =  dayjs().format('H'); //correct code
    // let curHour = 12; // temp for testing setting time to noon

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

  });
}

//display current state of planner
function displayPlanner (planner) {
  //colorize based on time of day  
  colorizePlanner();
  // planner = tmpActivitiesArray; // tmp artifical stored activities
  console.log("displayplanner planner contains:", planner);

  //if planner has content for this hour, load into textarea
  $.each(planner, function(index, entry) {
    let curPlan = entry;
    let actTime = curPlan.time;
    let actDesc = curPlan.desc;
    console.log("curPlan:", curPlan);
    console.log("actTime:", actTime);
    console.log("actDesc:", actDesc);
    console.log("#hour-"+`${actTime}`);
    // let hour = "#hour-"+`${actTime}`;
    let hourDiv = $("#hour-"+`${actTime}`);
    let textAreaElem = hourDiv.children(".description")
    console.log("textAreaElem.val() =", textAreaElem.val());
    let prevActs = textAreaElem.val();
    console.log("prevActs:", prevActs);
    if (prevActs) {
      if (prevActs.length !== " " ) {
        console.log("prevActs length is",prevActs.length);
        actDesc = (prevActs + actDesc);
        console.log ("acts combined into:", actDesc);
      }
    }
    textAreaElem.val(actDesc+"\n");
    

  });

}

//load planner entries
function loadPlanner () {
  var dailyPlanner = localStorage.getItem('daily-planner');
  if (dailyPlanner) {
    dailyPlanner = JSON.parse(dailyPlanner);
    console.log("loadplanner: daily-planner contains:", dailyPlanner);
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
  let currentTime = dayjs().format('dddd, MMMM D, YYYY');
  console.log(currentTime);
  currentDayElem.text(currentTime);

  //load entries and return daily planner
  var plannerEntries = loadPlanner ();
  displayPlanner(plannerEntries);

}

init ();