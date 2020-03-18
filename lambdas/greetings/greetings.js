'use strict'

exports.handler = function(event, context, callback) {
  const currentHour = (new Date()).getHours(); // returns hours in local timezone
  var msg = new Object(); 

  if (currentHour < 12) {
    msg.greeting = "morning"; // mid-night till noon
  } else if (currentHour < 16) {
    msg.greeting = "afternoon"; // until 4pm
  } else {
    msg.greeting = "evening"; // 4pm through mid-night 
  }

  var response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
  }
  callback(null, response)
}

