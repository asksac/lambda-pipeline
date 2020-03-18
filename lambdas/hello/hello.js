'use strict'

const AWS = require('aws-sdk'); 

async function callGreetings() {
  let lambda = new AWS.Lambda();
  let params = {
    FunctionName: 'GreetingsFunction', /* required */
    InvocationType: 'RequestResponse', 
    Payload: ''
  };

  let g = 'day'; 
  await lambda.invoke(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      if (data.Payload) {
        try {
          let p = JSON.parse(data.Payload); 
          let b = JSON.parse(p.body); 
          g = b.greeting; 
        } catch (err) {
          console.log('Error parsing response from GreetingsFunction: ' + err); 
        }
      }
    }
  }).promise(); // important to get a promise here, so we can await on it

  return g; 
}

exports.handler = async function(event, context, callback) {
  let g = await callGreetings(); 

  var response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    },
    body: 'Hello, and good ' + g + ' from AWS Lambda!'
  }
  callback(null, response)
}