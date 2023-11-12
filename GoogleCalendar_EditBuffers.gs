// Google Calendar (ICON Edit Buffers)

function myFunction() {
  // THIS SCRIPT FORMATS GOOGLE CALENDAR "BUFFER" EVENTS TO HAVE A SPECIFIC TITLE AND COLOR
  // CURRENTLY IT CHANGES THE TITLE FROM "Buffer Time" TO "-" AND CHANGED THE COLOR TO RED

  var calendar = "Grant Sessions"; // NAME OF CALENDAR BEING MODIFIED

  // var startDate = new Date(); // START DATE OF THE RANGE TO BE MODIFIED
  var startDate = new Date(); // START DATE OF THE RANGE TO BE MODIFIED

  var keyword = "Buffer time"; // KEYWORD TO SEARCH FOR IN EVENT TITLE (CASE SENSITIVE)
  
  var where = 0;        // WHERE TO SEARCH FOR EVENTS (0 = TITLE; 1 = DESCRIPTION)
  
  var color = "bold red"; // COLOR TO CHANGE THE EVENTS TO  
  
  var calendarId = CalendarApp.getCalendarsByName(calendar)[0].getId(); // GET CALENDAR ID
  
  var optionalArgs = {
    timeMin: startDate.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  };
  
  // CREATE LIST OF CALENDAR ALL CALEDNAR EVENTS ON DEFINED CALENDAR THAT START AFTER GIVEN START DATE (TODAY)
  var service = Calendar.Events;
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;

  // SEARCH THROUGH EVENTS
  for (i = 0; i < events.length; i++) {    
    Logger.log(events[i].summary);

    if (where == 0)
      var searchResult = events[i].summary.search(keyword);
    else if (where == 1){
      if (events[i].description == undefined)
        continue;
        
      var searchResult = events[i].description.search(keyword);
    }
  
    if (searchResult > -1){
      if (color == "bold blue")
        events[i].colorId = 9;
      else if (color == "blue")
        events[i].colorId = 1;
      else if (color == "turquoise")
        events[i].colorId = 7;
      else if (color == "green")
        events[i].colorId = 2;
      else if (color == "bold green")
        events[i].colorId = 10;
      else if (color == "yellow")
        events[i].colorId = 5;
      else if (color == "orange")
        events[i].colorId = 6;
      else if (color == "red")
        events[i].colorId = 4;
      else if (color == "bold red")
        events[i].colorId = 11;
      else if (color == "purple")
        events[i].colorId = 3;
      else if (color == "gray")
        events[i].colorId = 8;
      
      //Change the name of the buffer event
      events[i].summary = "-";      
      
      try{  
        service.update(events[i], calendarId, events[i].id);
      }
      catch(e){
        Logger.log(e);
      }
    }
  }
}
