'use strict'

const child_process = require('child_process');
const AWS = require('aws-sdk'); 

async function main() {
  // NOTE: sam local must be launched outside of Node.js process; spawning a child process does not work
  /*
  let sam = child_process.spawn('sam', ['local', 'start-lambda', '--host', '127.0.0.1', 
  '-p', '3001', '--region', 'us-east-1']); 

  //let sam = child_process.exec('sam local start-lambda --host 127.0.0.1 -p 3001 --region us-east-1'); 
  
  for await (const data of sam.stderr) {
    console.log(`stderr from child_process: ${data}`);
    if (data.includes('Running on')) {
      console.log('SAM is now running, continuing with test case execution...'); 
      break; 
    }
  };
  */  

  AWS.config.sslEnabled = false; 
  AWS.config.signatureVersion = ''; 
  AWS.config.httpOptions = {timeout: 5000, connectTimeout: 5000}
  AWS.config.maxRetries = 0; 

  let lambda = new AWS.Lambda({
    endpoint: 'http://127.0.0.1:3001/', 
    region: 'us-east-1'
  }); 

  let params = {
    FunctionName: 'GreetingsFunction', /* required */
    InvocationType: 'RequestResponse', // SAM local only supports RequestResponse invocation type
    Payload: ''
  };

  await lambda.invoke(params, function(err, data) {
    if (err) {
      console.log('Error from lambda.invoke: ', err, err.stack); // an error occurred
    } else {
      console.log('Response from GreetingsFunction: ' + JSON.stringify(data)); 
    }
  }).promise(); // important to get a promise here, so we can await on it 
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

main(); 
