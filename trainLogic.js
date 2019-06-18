var config = {
    apiKey: "AIzaSyCvPyrpzRiwD00FFohxkfYJETtV4ffr6TY",
    authDomain: "train-schedule-38e7d.firebaseio.com/",
    databaseURL: "https://train-schedule-38e7d.firebaseio.com/",
    storageBucket: "train-schedule-38e7d.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("x");
    var trainRate = $("#rate-input").val().trim();
  
    var newtrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: trainRate
    };
  
    database.ref().push(newtrain);
  
    console.log(newtrain.name);
    console.log(newtrain.destination);
    console.log(newtrain.start);
    console.log(newtrain.rate);
  
    alert("Train successfully added!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
  
  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainStart);
    // console.log(trainRate);
  
    
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    var trainMinutes = moment().add(trainRate, "minutes")
    trainMinutes = moment(trainMinutes).format("hh:mm")
    // console.log(trainMinutes)
    // No idea what's going on here. It keeps spitting out a random time. I tried to tell it to add the frequency rate in minutes to the time we've established as the launch date. It spits back a time, but I can't follow the math of where the date is coming from. To cover this good, I have the last column as Arrival Time because the transportation technology I based this assignment on doesn't exist yet.
    
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainRate),
      $("<td>").text(trainMinutes),
    );
  
    $("#train-table > tbody").append(newRow);
  });
 