// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCvPyrpzRiwD00FFohxkfYJETtV4ffr6TY",
    authDomain: "train-schedule-38e7d.firebaseio.com/",
    databaseURL: "https://train-schedule-38e7d.firebaseio.com/",
    storageBucket: "train-schedule-38e7d.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "ttrainorary" object for holding train data
    var newtrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: trainRate
    };
  
    // Uploads train data to the database
    database.ref().push(newtrain);
  
    // Logs everything to console
    console.log(newtrain.name);
    console.log(newtrain.destination);
    console.log(newtrain.start);
    console.log(newtrain.rate);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMinutes = moment().diff(moment(trainStart, "HH:mm"), "minutes"); 
    console.log(trainMinutes)
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainRate),
      $("<td>").text(trainMinutes),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume trainloyee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 Minutes.
  // Now we will create code in moment.js to confirm that any atttraint we use meets this test case
  