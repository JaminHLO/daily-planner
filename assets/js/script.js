
var currentDayElem = $('#currentDay');

//save the current textarea, replacing the old
$(document).on('click', '.saveBtn', function () {
  var curHour = $(this).parent().attr("id");
  console.log("pre-slice parent is:", curHour);
  curHour = curHour.slice(5); // removing leading "hour-"
  console.log("post-slice parent is:", curHour);
  var curNumHour = +curHour; //convert string to number

  var curTextArea = $(this).prev(".description").val().trim();
  console.log("textarea says:\n"+ curTextArea);
  //load current activity array
  var oldArray = loadPlanner();
  var newArray = [];
 //only add items to new array if they weren't for new saved hour
  $.each(oldArray, function(index, activity) {
    if(oldArray[index].time != curNumHour) {
        newArray.push(oldArray[index]);
      }
  });
  //create new object
  var newActObj = {"time": curNumHour,"desc": curTextArea};
  console.log("new object is:", newActObj);
  //push new saved hour object onto new activity array
  newArray.push(newActObj);
  console.log("new array is", newArray);
  //save new activity array to localStorage
  localStorage.setItem("daily-planner", JSON.stringify(newArray));
});



//colorize the planner - wrapped in jQuery call
$(function colorizePlanner () {
  //set work hours
  const workHoursArray = ["hour-9", "hour-10","hour-11","hour-12",
  "hour-13","hour-14","hour-15","hour-16","hour-17"]; 

  $.each(workHoursArray, function(index, hour) {
    let curPlannerElem = $("#"+`${hour}`);
    var curHour =  dayjs().format('H'); //correct code
    // let curHour = 12; // temp for testing setting time to noon

    // console.log("at", `${index}`, "the id is", "#"+`${hour}`);
    // console.log("the hour is", curHour);
    if ((curHour-9) < `${index}`) {
      // console.log("hasn't happened yet");
      curPlannerElem.removeClass();
      curPlannerElem.addClass('row time-block past');
    } else if ((curHour-9) == `${index}`) {
      // console.log("happening now");
      curPlannerElem.removeClass();
      curPlannerElem.addClass('row time-block present');
    } else {
      // console.log ("happening in future");
      curPlannerElem.removeClass();
      curPlannerElem.addClass('row time-block future');
    }
  });
});

//display current state of planner
  function displayPlanner (planner) {

  //if planner has content for this hour, load into textarea
  $.each(planner, function(index, entry) {
    let curPlan = entry;
    let actTime = curPlan.time;
    let actDesc = curPlan.desc;
    let hourDiv = $("#hour-"+`${actTime}`);
    let textAreaElem = hourDiv.children(".description")
    // console.log("textAreaElem.val() =", textAreaElem.val());
    let prevActs = textAreaElem.val();
    // console.log("prevActs:", prevActs);
    if (prevActs) {
      if (prevActs.length !== " " ) {
        // console.log("prevActs length is",prevActs.length);
        actDesc = (prevActs + actDesc);
        // console.log ("acts combined into:", actDesc);
      }
    }
    textAreaElem.val(actDesc+"\n");
    

  });

};

//load planner entries
function loadPlanner () {
  var dailyPlanner = localStorage.getItem('daily-planner');
  //if we have stored content, load it
  if (dailyPlanner) {
    dailyPlanner = JSON.parse(dailyPlanner);
    // console.log("loadplanner: daily-planner contains:", dailyPlanner);
  }
  else {
    dailyPlanner = [];
    // console.log("nothing in localStorage for daily-planner");
  }
  return dailyPlanner;
}

function init () {

  //set current day
  let currentTime = dayjs().format('dddd, MMMM D, YYYY');
  // console.log(currentTime);
  currentDayElem.text(currentTime);

  //load entries and return daily planner
  var plannerEntries = loadPlanner ();
  displayPlanner(plannerEntries);

}

init ();